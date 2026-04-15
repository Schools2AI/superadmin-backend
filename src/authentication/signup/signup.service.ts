import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, insertUser } from "../../model/user.model.ts";
import { singupValidation } from "../../validation/signup.validation.ts";
import { AppError } from "../../middleware/errorHandler.ts";
import type { SignupUser } from "../../validation/signup.validation.ts";
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw Error("Jwt Secret is required");
const saltRounds = 10;
export const singupUser = async (newUser: SignupUser) => {
    console.log("singupUser");
    try {
        singupValidation(newUser);
    } catch (error: any) {
        throw new AppError(error.message, 400);
    }

    const mobileExists = await findUserByEmail(newUser.email);

    if (mobileExists) {
        throw new AppError(
            "Email already exists. Kindly retry with different email",
            400,
        );
    }

    const hash = await bcrypt.hash(newUser.password, saltRounds);

    const values: (string | number)[] = [
        newUser.name, // full_name
        newUser.role_id, // role_id
        newUser.email,
        newUser.mobile_no, // phone_number
        hash, // password
        newUser.status || "Active",
    ];
    const result = await insertUser(values);

    const token = jwt.sign({ mobile: newUser.mobile_no }, jwtSecret, {
        expiresIn: "1h",
    });

    return {
        insertId: result.insertId,
        token,
    };
};
