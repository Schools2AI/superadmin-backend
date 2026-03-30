import {
    findAllSchool,
    insertSchool,
    updateSchoolFieldByID,
    deleteSchoolByID,
    findSchoolById,
} from "../model/school.modal.js";
import { getRoleId } from "../model/roles.model.js";
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

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const { schoolId } = await insertSchool(connection, schoolDetailsArray);

        const roleId = await getRoleId(connection, ["ADMIN"]);

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

        await connection.commit();
        return { email: newSchoolDetails.email, password };
    } catch (err) {
        await connection.rollback();
        console.error(err);
        throw err;
    } finally {
        connection.release();
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
    return result;
};
