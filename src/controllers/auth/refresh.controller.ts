import { Request, Response } from "express";
import { prisma } from "../../database/sqlite.database";
import generateTokens from "../../utils/generateToken";
import jwt from "jsonwebtoken";


export default async function refresh(req: Request, res: Response) {
    const { token } = req.body;

    if (!token) return res.status(401).json({ error: "Refresh token required" });

    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };

        const refreshToken = await prisma.refreshToken.findUnique({ where: { token } });

        if (!refreshToken) {
            return res.status(403).json({ error: "Invalid refresh token" });
        }

        const tokens = generateTokens(refreshToken.userId);

        await prisma.refreshToken.update({
            where: { token },
            data: { token: tokens.refreshToken }
        });

        return res.json(tokens);
    } catch (error) {
        return res.status(403).json({ error: "Token expired or invalid" });
    }
}
