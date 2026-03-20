import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, findUserByMobile } from "../../model/user.model.js";
import { fetchPermissionsById } from "../../model/permission.model.js";
import {
    insertOtp,
    findOtp,
    removeExpiredOtp,
} from "../../model/otps.model.js";
import {
    loginValidation,
    mobileValidation,
    otpValidation,
} from "../../validation/loginValidation.js";
export const loginUser = async (userCredential) => {
    try {
        loginValidation(userCredential);
    } catch (error) {
        throw { status: 400, message: error.message };
    }

    const { email, password } = userCredential;

    const user = await findUserByEmail(email);
    if (!user) {
        throw { status: 404, message: "User not found" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw { status: 400, message: "Incorrect password" };
    }

    const permissions = await fetchPermissionsById([user.role_id]);
    const userPermissions = permissions.map(({ name }) => name);
    console.log(userPermissions);

    const token = jwt.sign(
        { userPermissions },
        process.env.JWT_SECRET || "secret key",
        { expiresIn: "1h" },
    );

    return { token };
};

export const sendOtp = async ({ mobile_no }) => {
    try {
        mobileValidation({ mobileNo: mobile_no });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
    const result = await findUserByMobile(mobile_no);
    if (!result) {
        throw { status: 404, message: "User not found" };
    }
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const value = [mobile_no, 123456, expiresAt];

    try {
        const otpExist = await findOtp([mobile_no]);
        if (otpExist) {
            console.log("same otp send again ", otpExist.otp);
            return;
        }
        const result = await insertOtp(value);
        console.log(result);
    } catch (error) {
        throw { status: 500, message: "Database error" };
    }

    console.log(expiresAt);
};

export const verifyOtp = async ({ mobile_no, otp }) => {
    try {
        mobileValidation({ mobileNo: mobile_no });
        otpValidation({ otp });
    } catch (error) {
        throw { status: 400, message: error.message };
    }
    try {
        const otpExist = await findOtp([mobile_no]);
        if (otpExist) {
            if (otpExist.otp === otp) {
                const token = jwt.sign(
                    { mobile: mobile_no },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" },
                );
                removeExpiredOtp();
                return token;
            }
        }

        return false;
    } catch (error) {
        throw { status: 500, message: "Database error" };
    }

    console.log(expiresAt);
};
