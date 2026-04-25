import { AppError } from "./errorHandler.js";
export const RBAC = (accessLabel) => (req, res, next) => {
    const { userPermissions } = req.user;
    if (!userPermissions.includes(accessLabel)) {
        return next(new AppError("Unauthorized access", 403));
    }
    next();
};
//# sourceMappingURL=RBAC.middleware.js.map