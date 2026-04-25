import { findRoles, insertRole } from "../model/roles.model.js";
export const getAllRoles = async () => {
    const roles = findRoles();
    return roles;
};
export const createRole = async (newRole) => {
    const role = insertRole(null, newRole);
};
//# sourceMappingURL=roles.service.js.map