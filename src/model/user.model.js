import pool from "../database/db.js";

export const findUserByMobile = async (mobile) => {
    const findUserSql = "SELECT * FROM users WHERE mobile_no = ?";
    const [results] = await pool.query(findUserSql, [mobile]);
    return results[0];
};

export const findUserByEmail = async (email) => {
    const findUserSql = "SELECT * FROM super_users  WHERE email = ?";
    const [results] = await pool.query(findUserSql, [email]);
    return results[0];
};

export const insertSchoolAdmin = async (connection = null, values) => {
    console.log("value -> ", values);
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

export const insertUser = async (values, connection = null) => {
    console.log("value -> ", values);
    const db = connection || pool;

    const insertUserSql = `
        INSERT INTO super_users
        (full_name, role_id, email, contact_no, password, status)
        VALUES (?,?,?,?,?,?)
    `;

    const [results] = await db.execute(insertUserSql, values);
    // console.log("insertUser");
    return results;
};
