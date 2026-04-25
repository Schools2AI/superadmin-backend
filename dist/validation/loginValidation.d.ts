export declare const loginValidation: (obj: LoginInput) => void;
export type LoginInput = {
    email: string;
    password: string;
};
export declare const mobileValidation: (obj: {
    mobile_no: string;
}) => void;
export declare const otpValidation: (obj: {
    otp: string;
}) => void;
