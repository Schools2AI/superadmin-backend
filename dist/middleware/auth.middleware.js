import jwt from "jsonwebtoken";
import { AppError } from "./errorHandler.js";
const secret = process.env.JWT_SECRET;
if (!secret) {
    throw Error("JWT secret is required");
}
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("JWT token missing", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // { id, role }
        next();
    }
    catch (error) {
        return next(new AppError("Invalid token", 401));
    }
};
//# sourceMappingURL=auth.middleware.js.map