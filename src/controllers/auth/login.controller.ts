import z from "zod";
import loginSchema from "../../schema/auth/login.schema";
import { prisma } from "../../database/sqlite.database";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import generateTokens from "../../utils/generateToken";

export default async function login(req: Request, res: Response) {
    try {

        const validatedInput = loginSchema.safeParse(req.body);

        if (!validatedInput.success) {
            const tree = z.treeifyError(validatedInput.error);

            return res.status(400).json({
                error: {
                    email: tree.properties?.email?.errors[0],
                    password: tree.properties?.password?.errors[0]
                }
            });
        }

        const { email, password } = validatedInput.data;

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({
                error: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                error: "Invalid email or password"
            });
        }

        const { accessToken, refreshToken } = generateTokens(user.id);

        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId: user.id
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User logged in successfully",
            accessToken,
        });

    } catch (error) {
        return res.status(500).json({
            error: `Internal server error : ${error}`
        });
    }
}