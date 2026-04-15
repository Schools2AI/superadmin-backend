import {
    getAllSchoolDetails,
    createNewSchool,
    updateSchoolField,
    deleteSchool,
    getSchoolDetails,
} from "./school.service.ts";
import type { Request, Response } from "express";
export const getAllSchoolDetailsController = async (
    req: Request,
    res: Response,
) => {
    try {
        const schoolDetails = await getAllSchoolDetails();
        res.status(200).json(schoolDetails);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const getSchoolDetailsController = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const schoolDetails = await getSchoolDetails(id as string);
        res.status(200).json(schoolDetails);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const createNewSchoolController = async (
    req: Request,
    res: Response,
) => {
    try {
        const newSchoolDetails = req.body;
        const credential = await createNewSchool(newSchoolDetails);
        res.status(200).json({ success: true, credential });
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const updateSchoolFieldController = async (
    req: Request,
    res: Response,
) => {
    try {
        const { field, value } = req.body;
        const schoolId = req.params?.id;
        const status = await updateSchoolField(schoolId, field, value);
        res.status(200).json(status);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const deleteSchoolController = async (req: Request, res: Response) => {
    try {
        const schoolId = req.params?.id;
        const status = await deleteSchool(schoolId);
        res.status(200).json(status);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
