import { loginUser, sendOtp, verifyOtp } from "./login.service.js";

export const loginUserController = async (req, res) => {
    console.log("loginUserController");
    try {
        const userCredential = req.body;

        const { token } = await loginUser(userCredential);

        res.status(200).json({ isSuccess: true, token });
    } catch (error) {
        console.log(error);
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        res.status(status).json({ isSuccess: false, message });
    }
};

export const sendOtpController = async (req, res) => {
    try {
        await sendOtp(req.body);
        res.status(200).send("OTP send");
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        res.status(status).send(message);
    }
};

export const verifyOtpController = async (req, res) => {
    try {
        const token = await verifyOtp(req.body);
        if (token) {
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                sameSite: "none",
                secure: true,
            });

            res.status(200).send("login successfully");
        } else {
            res.status(400).send("Invalid or expired OTP");
        }
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        res.status(status).send(message);
    }
};

export const logoutController = (req, res) => {
    res.clearCookie("token");

    return res.status(200).json({
        isSuccess: true,
        message: "Logged out successfully",
    });
};
