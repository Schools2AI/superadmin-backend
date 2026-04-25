import { getAllSchoolDetails, createNewSchool, updateSchoolField, deleteSchool, getSchoolDetails, } from "./school.service.js";
export const getAllSchoolDetailsController = async (req, res) => {
    try {
        const schoolDetails = await getAllSchoolDetails();
        res.status(200).json(schoolDetails);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
export const getSchoolDetailsController = async (req, res) => {
    try {
        const { id } = req.params;
        const schoolDetails = await getSchoolDetails(id);
        res.status(200).json(schoolDetails);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
export const createNewSchoolController = async (req, res) => {
    try {
        const newSchoolDetails = req.body;
        const credential = await createNewSchool(newSchoolDetails);
        res.status(200).json({ success: true, credential });
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
export const updateSchoolFieldController = async (req, res) => {
    try {
        const { field, value } = req.body;
        const schoolId = req.params?.id;
        const status = await updateSchoolField(schoolId, field, value);
        res.status(200).json(status);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
export const deleteSchoolController = async (req, res) => {
    try {
        const schoolId = req.params?.id;
        const status = await deleteSchool(schoolId);
        res.status(200).json(status);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
//# sourceMappingURL=school.controller.js.map