import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/sqlite.database";


export default async function deleteLink(req: Request, res: Response) {
    try {
        const { id, token } = req.body;

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string };

        const link = await prisma.link.delete({
            where: {
                id
            }
        });

        return res.status(200).json({
            message: "Link deleted successfully",
            link
        });
    } catch (error) {
        return res.status(500).json({
            error: `Internal server error : ${error}`
        });
    }
}