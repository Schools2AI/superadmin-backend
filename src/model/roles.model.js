import pool from "../database/db.js";

export const findRoles = async () => {
    const sql = `SELECT * from roles `;
    const [results] = await pool.query(sql);
    return results;
};

export const getRoleIdFromAdminRole = async (connection = null, role) => {
    const db = connection || pool;

    const sql = `SELECT role_id FROM admin_roles WHERE role_name = ? LIMIT 1`;
    const [rows] = await db.execute(sql, role);

    if (rows.length === 0) {
        return null; // role not found
    }
    // console.log("getRoleId ", rows);
    return rows[0].role_id;
};

export const insertRole = async (connection = null, role, schoolId) => {
    const db = connection || pool;

    const sql = `INSERT INTO roles (role, school_id) VALUES (?, ?)`;
    const [results] = await db.execute(sql, [role, schoolId]);

    return results.insertId;
};
