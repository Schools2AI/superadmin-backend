import { loginUser, sendOtp, verifyOtp } from "./login.service.js";
import { AppError } from "../../middleware/errorHandler.js";
export const loginUserController = async (req, res) => {
    console.log("loginUserController");
    const userCredential = req.body;
    const { token } = await loginUser(userCredential);
    res.status(200).json({ isSuccess: true, token });
};
export const sendOtpController = async (req, res, next) => {
    await sendOtp(req.body);
    res.status(200).send("OTP sent");
};
export const verifyOtpController = async (req, res, next) => {
    const token = await verifyOtp(req.body);
    if (token) {
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });
        res.status(200).send("login successfully");
    }
    else {
        return next(new AppError("Invalid or expired OTP", 400));
    }
};
export const logoutController = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        isSuccess: true,
        message: "Logged out successfully",
    });
};
//# sourceMappingURL=login.controller.js.map