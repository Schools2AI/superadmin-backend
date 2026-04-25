import type { SignupUser } from "../../validation/signup.validation.ts";
export declare const singupUser: (newUser: SignupUser) => Promise<{
    insertId: number;
    token: string;
}>;
