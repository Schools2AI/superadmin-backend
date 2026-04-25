import * as z from "zod";
declare const newUserSchema: z.ZodObject<{
    name: z.ZodString;
    role_id: z.ZodNumber;
    school_id: z.ZodOptional<z.ZodNumber>;
    email: z.ZodEmail;
    mobile_no: z.ZodString;
    password: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodString;
}, z.core.$strip>;
export declare const singupValidation: (newUser: SignupUser) => void;
export type SignupUser = z.infer<typeof newUserSchema>;
export {};
