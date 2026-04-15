import {
    findAllSchool,
    insertSchool,
    updateSchoolFieldByID,
    deleteSchoolByID,
    findSchoolById,
} from "../model/school.modal.ts";
import { getRoleIdFromAdminRole } from "../model/roles.model.ts";
import { populateSchoolFeatures } from "../model/features.model.ts";
import { insertSchoolAdmin } from "../model/user.model.ts";
import bcrypt from "bcrypt";
import { schoolValidation } from "../validation/schoolValidation.ts";
import pool from "../database/db.ts";
import type { NewSchoolDetails } from "../type/type.js";

export const getAllSchoolDetails = async () => {
    const schoolDetails = await findAllSchool();
    return schoolDetails;
};

export const getSchoolDetails = async (id: string) => {
    const schoolDetails = await findSchoolById([id]);
    return schoolDetails;
};

const saltRounds = 10;

export const createNewSchool = async (newSchoolDetails: NewSchoolDetails) => {
    // console.log(newSchoolDetails);
    try {
        schoolValidation(newSchoolDetails);
    } catch (error: any) {
        throw { status: 400, message: error.message };
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const { schoolId } = await insertSchool(newSchoolDetails, connection);

        const roleId = await getRoleIdFromAdminRole(["ADMIN"], connection);

        await populateSchoolFeatures([schoolId], connection);

        const password = "ADMIN12345";
        const hash = await bcrypt.hash(password, saltRounds);

        const newUserArray: string[] = [
            "ADMIN",
            roleId,
            schoolId,
            newSchoolDetails.email,
            newSchoolDetails.mobileNo,
            hash,
            newSchoolDetails.status,
        ];

        await insertSchoolAdmin(newUserArray, connection);

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

export const updateSchoolField = async (
    schoolId: string,
    field: string,
    value: string,
) => {
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

export const deleteSchool = async (schoolId: string) => {
    if (!schoolId) {
        throw { status: 400, message: "School Id  required" };
    }
    const result = await deleteSchoolByID(schoolId);
    return result;
};
