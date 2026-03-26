import {
    findAllSchool,
    insertSchool,
    updateSchoolFieldByID,
    deleteSchoolByID,
    findSchoolById,
} from "../model/school.modal.js";
import { insertRole } from "../model/roles.model.js";
import { populateSchoolFeatures } from "../model/features.model.js";
import { insertUser } from "../model/user.model.js";
import bcrypt from "bcrypt";
import { schoolValidation } from "../validation/schoolValidation.js";
import pool from "../database/db.js";

export const getAllSchoolDetails = async () => {
    const schoolDetails = await findAllSchool();
    return schoolDetails;
};

export const getSchoolDetails = async ({ id }) => {
    const schoolDetails = await findSchoolById([id]);
    return schoolDetails;
};

const saltRounds = 10;

//import { createConnection } from "../database/db.js"; // export your pool config

export const createNewSchool = async (newSchoolDetails) => {
    try {
        schoolValidation(newSchoolDetails);
    } catch (error) {
        throw { status: 400, message: error.message };
    }

    const schoolDetailsArray = [
        newSchoolDetails.schoolName,
        newSchoolDetails.country,
        newSchoolDetails.state,
        newSchoolDetails.city,
        newSchoolDetails.pincode,
        newSchoolDetails.cost,
        newSchoolDetails.studentCount,
        newSchoolDetails.teacherCount,
        newSchoolDetails.language,
        newSchoolDetails.board,
        newSchoolDetails.status,
        newSchoolDetails.website,
        newSchoolDetails.domains,
        newSchoolDetails.timeZone,
    ];

    // ✅ Get a callback-based connection using promise wrapper
    const connection = await new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) return reject(err);
            resolve(conn); // ✅ This is a callback-based connection
        });
    });

    try {
        // ✅ Wrap beginTransaction in a promise
        await new Promise((resolve, reject) => {
            connection.beginTransaction((err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        const { schoolId } = await insertSchool(connection, schoolDetailsArray);

        const { roleId } = await insertRole(connection, [
            "SCHOOL_ADMIN",
            schoolId,
        ]);

        await populateSchoolFeatures(connection, [schoolId]);

        const password = "ADMIN12345";
        const hash = await bcrypt.hash(password, saltRounds);

        const newUserArray = [
            "ADMIN",
            roleId,
            schoolId,
            newSchoolDetails.email,
            newSchoolDetails.mobileNo,
            hash,
            newSchoolDetails.description,
        ];

        await insertUser(connection, newUserArray);

        // ✅ Wrap commit in a promise
        await new Promise((resolve, reject) => {
            connection.commit((err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        connection.release(); // ✅ Release back to pool
        return { email: newSchoolDetails.email, password };
    } catch (err) {
        // ✅ Rollback on any error
        await new Promise((resolve) => {
            connection.rollback(() => resolve());
        });
        connection.release(); // ✅ Always release
        console.log(err);
        throw err;
    }
};

export const updateSchoolField = async (schoolId, field, value) => {
    if (!schoolId) {
        throw { status: 400, message: "School Id  required" };
    }
    if (!field) {
        throw { status: 400, message: "Field  required" };
    }

    if (!value) {
        throw { status: 400, message: "Value  required" };
    }

    const allowedFields = [
        "school_name",
        "country",
        "state",
        "city",
        "pincode",
        "timezone",
        "cost",
        "student_count",
        "teacher_count",
        "language_preference",
        "board",
        "status",
        "website_enabled",
        "allowed_domains",
    ];

    if (!allowedFields.includes(field)) {
        throw { status: 400, message: "Invalid field name" };
    }
    const result = await updateSchoolFieldByID(schoolId, field, value);
    return result;
};

export const deleteSchool = async (schoolId) => {
    if (!schoolId) {
        throw { status: 400, message: "School Id  required" };
    }
    const result = await deleteSchoolByID(schoolId);
};
