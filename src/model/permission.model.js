import pool from "../database/db.js";

export const fetchPermissionsById = (value) => {
    const sql = `
        SELECT p.name
        FROM permissions p
        JOIN role_permissions rp ON rp.permission_id = p.id
        WHERE rp.role_id = ?
        `;
    return new Promise((response, reject) => {
        pool.query(sql, value, (error, results) => {
            if (error) {
                reject(error);
            }

            response(results);
        });
    });
};
