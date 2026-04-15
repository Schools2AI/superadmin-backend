import { findRoles, insertRole } from "../model/roles.model.ts";
export const getAllRoles = async () => {
    const roles = findRoles();
    return roles;
};

export const createRole = async (newRole: string) => {
    const role = insertRole(null, newRole);
};
