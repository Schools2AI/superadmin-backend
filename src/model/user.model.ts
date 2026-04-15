import pool from "../database/db.ts";
import type {
    Pool,
    PoolConnection,
    ResultSetHeader,
    RowDataPacket,
} from "mysql2/promise";
export const findUserByMobile = async (mobile: string) => {
    const findUserSql = "SELECT * FROM users WHERE mobile_no = ?";
    const [results] = await pool.query<RowDataPacket[]>(findUserSql, [mobile]);
    return results[0];
};

export const findUserByEmail = async (email: string) => {
    const findUserSql = "SELECT * FROM super_users  WHERE email = ?";
    const [results] = await pool.query<RowDataPacket[]>(findUserSql, [email]);
    return results[0];
};

export const insertSchoolAdmin = async (
    values: string[],
    connection: PoolConnection | null = null,
) => {
    // console.log("value -> ", values);
    const db = connection || pool;

    const insertUserSql = `
        INSERT INTO users
        (full_name, role_id, school_id, email, phone_number, password, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [results] = await db.execute(insertUserSql, values);
    // console.log("insertUser");
    return results;
};

export const insertUser = async (
    values: (string | number)[],
    connection = null,
) => {
    const db = connection || pool;

    const insertUserSql = `
        INSERT INTO super_users
        (full_name, role_id, email, contact_no, password, status)
        VALUES (?,?,?,?,?,?)
    `;

    const [results] = await db.execute<ResultSetHeader>(insertUserSql, values);
    // console.log("insertUser");
    return results;
};
