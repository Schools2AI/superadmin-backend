import pool from "../database/db.js";

export const findAllSchool = async () => {
    const sql = "SELECT * FROM schools";
    const [result] = await pool.query(sql);
    return result;
};

export const findSchoolById = async (value) => {
    const sql = "SELECT * FROM schools WHERE school_id = ?";
    const [result] = await pool.query(sql, value);
    return result;
};

export const insertSchool = async (connection = null, values) => {
    const sql = `
        INSERT INTO schools (
            school_name,
            country,
            state,
            city,
            pincode,
            cost,
            student_count,
            teacher_count,
            language_preference,
            board,
            status,
            website_enabled,
            allowed_domains,
            timezone
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?)
    `;

    const db = connection || pool;
    const [result] = await db.execute(sql, values);

    return {
        schoolId: result.insertId,
    };
};

export const updateSchoolFieldByID = async (schoolId, field, value) => {
    const sql = `
    UPDATE schools
    SET
     ${field} = ?
    WHERE school_id = ?;
  `;

    const [result] = await pool.execute(sql, [value, schoolId]);

    return {
        schoolId,
        affectedRows: result.affectedRows,
    };
};

export const deleteSchoolByID = async (schoolId) => {
    const sql = `
    DELETE FROM schools
    WHERE school_id = ?;
  `;

    const [result] = await pool.execute(sql, [schoolId]);

    return {
        schoolId,
        affectedRows: result.affectedRows,
    };
};
