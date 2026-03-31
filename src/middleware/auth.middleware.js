import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("JWT token missing", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { id, role }
        next();
    } catch (error) {
        return next(new AppError("Invalid token", 401));
    }
};

