import pool from "../database/db.js";
export const fetchPermissionsById = async (value, connection = null) => {
    const db = connection || pool;
    const sql = `
        SELECT p.name
        FROM permissions p
        JOIN role_permissions rp ON rp.permission_id = p.id
        WHERE rp.role_id = ?
    `;
    const [results] = await db.query(sql, [value]);
    return results;
};
//# sourceMappingURL=permission.model.js.map