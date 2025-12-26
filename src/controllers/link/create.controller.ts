import { Request, Response } from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import createLinkSchema from "../../schema/link/create.schema";
import { prisma } from "../../database/sqlite.database";
import urlCheck from "../../utils/isUrlValid";

export default async function createLink(req: Request, res: Response) {
    try {
        const { url, shortUrl, token } = req.body;

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string };

        const validatedInput = createLinkSchema.safeParse({
            url,
            shortUrl
        });

        if (!validatedInput.success) {
            const tree = z.treeifyError(validatedInput.error);

            return res.status(400).json({
                error: {
                    url: tree.properties?.url?.errors[0],
                    shortUrl: tree.properties?.shortUrl?.errors[0]
                }
            });
        }

        const isUrlValid = await urlCheck(validatedInput.data.url);

        if (!isUrlValid) {
            return res.status(400).json({ error: "Invalid URL" });
        }

        const link = await prisma.link.create({
            data: {
                url: validatedInput.data.url,
                shortUrl: validatedInput.data.shortUrl,
                userId: payload.userId
            }
        });

        return res.status(201).json({
            message: "Link created successfully",
            link
        });

    } catch (error) {
        return res.status(500).json({
            error: `Internal server error : ${error}`
        });
    }
}