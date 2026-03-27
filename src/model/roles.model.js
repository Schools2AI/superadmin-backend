import pool from "../database/db.js";

export const findRoles = async () => {
    const sql = `SELECT * from roles `;
    const [results] = await pool.query(sql);
    return results;
};

export const insertRole = async (connection = null, newRole) => {
    const db = connection || pool;
    const sql = `INSERT INTO roles (role,school_id) VALUES (?,?)`;
    const [results] = await db.execute(sql, newRole);
    return { roleId: results.insertId };
};
