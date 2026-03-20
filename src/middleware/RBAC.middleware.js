export const RBAC = (accessLabel) => (req, res, next) => {
    const { userPermissions } = req.user;
    if (!userPermissions.includes(accessLabel)) {
        return res.status(401).json({
            isSuccessful: false,
            error: "Unauthorized access",
        });
    }

    next();
};
