import { Request, Response } from "express";
import z from "zod";
import hashPassword from "../../utils/hashPassword";
import { prisma } from "../../database/sqlite.database";
import registerSchema from "../../schema/auth/register.schema";

export default async function register(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const validatedInput = registerSchema.safeParse({
            email,
            password
        });

        if (!validatedInput.success) {
            const tree = z.treeifyError(validatedInput.error);

            return res.status(400).json({
                error: {
                    email: tree.properties?.email?.errors[0],
                    password: tree.properties?.password?.errors[0]
                }
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true
            }
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            error: `Internal server error : ${error}`
        });
    }
}