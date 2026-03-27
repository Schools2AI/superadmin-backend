import pool from "../database/db.js";

export const findUserByMobile = async (mobile) => {
    const findUserSql = "SELECT * FROM users WHERE mobile_no = ?";
    const [results] = await pool.query(findUserSql, [mobile]);
    return results[0];
};

export const findUserByEmail = async (email) => {
    const findUserSql = "SELECT * FROM users WHERE email = ?";
    const [results] = await pool.query(findUserSql, [email]);
    return results[0];
};

export const insertUser = async (connection = null, values) => {
    const db = connection || pool;

    const insertUserSql = `
        INSERT INTO users
        (full_name, role_id, school_id, email, phone_number, password, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [results] = await db.execute(insertUserSql, values);
    return results;
};
