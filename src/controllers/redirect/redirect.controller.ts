import { Request, Response } from "express";
import { prisma } from "../../database/sqlite.database";
import redis from "../../database/redis.database";

export default async function redirect(req: Request, res: Response) {
    const { shortUrl } = req.params;

    const cachedLink = await redis.get(shortUrl);

    if (cachedLink) {
        return res.redirect(cachedLink);
    }

    const link = await prisma.link.findUnique({
        where: {
            shortUrl
        }
    })

    if (!link) {
        return res.status(404).json({
            error: "Link not found"
        })
    }

    await redis.set(shortUrl, link.url, {
        expiration: {
            type: "EX",
            value: 60 * 60 * 24 * 7
        }
    });

    res.redirect(link.url)
}