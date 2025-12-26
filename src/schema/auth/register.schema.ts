import z from "zod";

const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
});

export default registerSchema;