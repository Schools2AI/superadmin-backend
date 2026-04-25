import { getAllRoles, createRole } from "./roles.service.js";
export const getRolesController = async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.status(200).json(roles);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
export const createRolesController = async (req, res) => {
    try {
        const roles = await createRole(req.body);
        res.status(200).json(roles);
    }
    catch (error) {
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
//# sourceMappingURL=roles.controller.js.map