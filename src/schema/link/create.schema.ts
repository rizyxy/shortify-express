import z from "zod";

const createLinkSchema = z.object({
    url: z.url(),
    shortUrl: z.string().min(3)
});

export default createLinkSchema;