import pool from "../database/db.ts";
import type {
    Pool,
    PoolConnection,
    ResultSetHeader,
    RowDataPacket,
} from "mysql2/promise";
export const findRoles = async () => {
    const sql = `SELECT * from roles `;
    const [results] = await pool.query(sql);
    return results;
};

export const getRoleIdFromAdminRole = async (
    role: string[],
    connection: PoolConnection | null = null,
) => {
    const db = connection || pool;

    const sql = `SELECT role_id FROM admin_roles WHERE role_name = ? LIMIT 1`;
    const [rows] = await db.execute<RowDataPacket[]>(sql, role);

    if (rows.length === 0) {
        return null; // role not found
    }
    // console.log("getRoleId ", rows);
    return rows[0].role_id;
};

export const insertRole = async (connection = null, role: string) => {
    const db = connection || pool;

    const sql = `INSERT INTO roles (role) VALUES (?)`;
    const [results] = await db.execute<ResultSetHeader>(sql, [role]);

    return results.insertId;
};
