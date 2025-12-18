import { z } from "zod";
export declare const signinInputs: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type SigninInputs = z.infer<typeof signinInputs>;
