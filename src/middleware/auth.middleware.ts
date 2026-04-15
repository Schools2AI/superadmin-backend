import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.ts";
import type { Request, Response, NextFunction } from "express";
import type { UserPayload } from "../type/type.js";
const secret: string | undefined = process.env.JWT_SECRET;
if (!secret) {
    throw Error("JWT secret is required");
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("JWT token missing", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, secret) as UserPayload;

        req.user = decoded; // { id, role }
        next();
    } catch (error) {
        return next(new AppError("Invalid token", 401));
    }
};
