import { z } from "zod";

export const signinInputs = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export type SigninInputs = z.infer<typeof signinInputs>