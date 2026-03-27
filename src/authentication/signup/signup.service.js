import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, insertUser } from "../../model/user.model.js";
import { singupValidation } from "../../validation/signup.validation..js";
const saltRounds = 10;
export const singupUser = async (newUser) => {
    console.log("singupUser");
    try {
        singupValidation(newUser);
    } catch (error) {
        console.log("Z", error.message);

        throw {
            status: 400,
            message: error.message,
        };
    }
    // for (let key in newUser) {
    //     if (!newUser[key]) {
    //         throw {
    //             status: 400,
    //             message: `Field "${key}" is required`,
    //         };
    //     }
    // }

    const mobileExists = await findUserByEmail(newUser.email);

    if (mobileExists) {
        throw {
            status: 400,
            message:
                "Email number already exists. Kindly retry with different email",
        };
    }

    const hash = await bcrypt.hash(newUser.password, saltRounds);

    const values = [
        newUser.name, // full_name
        newUser.role_id, // role_id
        newUser.school_id || null,
        newUser.email,
        newUser.mobile_no, // phone_number
        hash, // password
        newUser.status || "active",
    ];
    const result = await insertUser(null, values);

    const token = jwt.sign({ mobile: newUser.mobile }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    return {
        insertId: result.insertId,
        token,
    };
};
