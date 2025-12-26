import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/sqlite.database";

export default async function getLinks(req: Request, res: Response) {

    const { token } = req.body;

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string };

        const links = await prisma.link.findMany({
            where: {
                userId: payload.userId
            }
        });

        return res.status(200).json({
            message: "Links retrieved successfully",
            links
        });
    } catch (error) {
        return res.status(500).json({
            error: `Internal server error : ${error}`
        });
    }
}