import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../../database/sqlite.database";

export default async function logout(req: Request, res: Response) {
    const { token } = req.body;

    if (!token) return res.status(401).json({ error: "Refresh token required" });

    try {
        const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };

        await prisma.refreshToken.deleteMany({ where: { userId: payload.userId } });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(403).json({ error: "Token expired or invalid" });
    }
}