import * as z from "zod";

export const loginValidation = (obj: LoginInput) => {
    const schema = z
        .object({
            email: z.email().nonempty(),
            password: z.string().min(6).nonempty(),
        })
        .required();

    schema.parse(obj);
};
export type LoginInput = { email: string; password: string };
export const mobileValidation = (obj: { mobile_no: string }) => {
    const schema = z
        .object({
            mobileNo: z.string().min(10).max(10).nonempty(),
        })
        .required();
    schema.parse(obj);
};

export const otpValidation = (obj: { otp: string }) => {
    const schema = z
        .object({
            otp: z.string().nonempty(),
        })
        .required();
    schema.parse(obj);
};
