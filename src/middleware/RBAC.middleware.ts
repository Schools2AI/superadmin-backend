import { AppError } from "./errorHandler.ts";
import type { Request, Response, NextFunction } from "express";

export const RBAC =
    (accessLabel: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { userPermissions } = req.user;
        if (!userPermissions.includes(accessLabel)) {
            return next(new AppError("Unauthorized access", 403));
        }

        next();
    };
