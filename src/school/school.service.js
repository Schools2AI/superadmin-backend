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
    // // Validate all fields present
    // for (const key in newSchoolDetails) {
    //     if (!newSchoolDetails[key]) {
    //         throw { status: 400, message: `Field "${key}" is required` };
    //     }
    // }

    try {
        schoolValidation(newSchoolDetails);
    } catch (error) {
        throw { status: 400, message: error.message };
    }

    // console.log(newSchoolDetails);
    const schoolDetailsArray = [
        newSchoolDetails.schoolName, // school_name
        newSchoolDetails.country, // country
        newSchoolDetails.state, // state
        newSchoolDetails.city, // city
        newSchoolDetails.pincode, // pincode
        newSchoolDetails.cost, // cost
        newSchoolDetails.studentCount, // student_count
        newSchoolDetails.teacherCount, // teacher_count
        newSchoolDetails.language, // language_preference
        newSchoolDetails.board, // board
        newSchoolDetails.status, // status
        newSchoolDetails.website, // website_enabled
        newSchoolDetails.domains, // allowed_domains
        newSchoolDetails.timeZone, //timeZone
    ];

    const { schoolId } = await insertSchool(schoolDetailsArray);
    const { roleId } = await insertRole(["SCHOOL_ADMIN", schoolId]);

    await populateSchoolFeatures([schoolId]);
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
    const result = await insertUser(newUserArray);

    // console.log(result);

    return { email: newSchoolDetails.email, password };
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
