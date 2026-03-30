import pool from "../database/db.js";

export const findRoles = async () => {
    const sql = `SELECT * from roles `;
    const [results] = await pool.query(sql);
    return results;
};

export const getRoleId = async (connection = null, role) => {
    const db = connection || pool;

    const sql = `SELECT id FROM roles WHERE role = ? LIMIT 1`;
    const [rows] = await db.execute(sql, role);

    if (rows.length === 0) {
        return null; // role not found
    }
    console.log("getRoleId ", rows);
    return rows[0].id;
};

export const insertRole = async (connection = null, role, schoolId) => {
    const db = connection || pool;

    const sql = `INSERT INTO roles (role, school_id) VALUES (?, ?)`;
    const [results] = await db.execute(sql, [role, schoolId]);

    return results.insertId;
};
