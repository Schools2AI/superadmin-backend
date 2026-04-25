import type { LoginInput } from "../../validation/loginValidation.ts";
export declare const loginUser: (userCredential: LoginInput) => Promise<{
    token: string;
}>;
export declare const sendOtp: ({ mobile_no }: {
    mobile_no: string;
}) => Promise<void>;
export declare const verifyOtp: ({ mobile_no, otp, }: {
    mobile_no: string;
    otp: string;
}) => Promise<string | false>;
