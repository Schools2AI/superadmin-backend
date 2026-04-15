import {
    createFeature,
    getFeature,
    toggleFeature,
} from "./features.service.ts";
import type { Request, Response } from "express";
export const createFeatureController = async (req: Request, res: Response) => {
    try {
        const status = await createFeature(req.body);
        res.status(200).json(status);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const getFeatureController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const features = await getFeature(id as string);
        res.status(200).json(features);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const toggleFeatureController = async (req: Request, res: Response) => {
    try {
        const features = await toggleFeature(req.body);
        res.status(200).json(features);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
