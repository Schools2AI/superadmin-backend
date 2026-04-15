import express from "express";
import {
    loginUserController,
    sendOtpController,
    verifyOtpController,
    logoutController,
} from "./login/login.controller.ts";
import { signupUserController } from "./signup/signup.controller.ts";

const router = express.Router();

router.post("/login", loginUserController);
router.post("/signup", signupUserController);
router.post("/login/mobile/send-otp", sendOtpController);
router.post("/login/mobile/verify-otp", verifyOtpController);
router.get("/logout", logoutController);

export default router;
