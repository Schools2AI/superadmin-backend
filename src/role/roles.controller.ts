import { getAllRoles, createRole } from "./roles.service.ts";
import type { Request, Response } from "express";
export const getRolesController = async (req: Request, res: Response) => {
    try {
        const roles = await getAllRoles();
        res.status(200).json(roles);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

export const createRolesController = async (req: Request, res: Response) => {
    try {
        const roles = await createRole(req.body);
        res.status(200).json(roles);
    } catch (error: any) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
