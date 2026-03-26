import pool from "../database/db.js";

export const findAllSchool = () => {
    const sql = "SELECT * FROM schools";
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

export const findSchoolById = (value) => {
    const sql = "SELECT * FROM schools WHERE school_id = ?";
    return new Promise((resolve, reject) => {
        pool.query(sql, value, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

export const insertSchool = (connection = null, values) => {
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

    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve({
                schoolId: result.insertId,
            });
        });
    });
};

export const updateSchoolFieldByID = (schoolId, field, value) => {
    const sql = `
    UPDATE schools
    SET
     ${field} = ?
    WHERE school_id = ?;
  `;

    return new Promise((resolve, reject) => {
        pool.query(sql, [value, schoolId], (err, result) => {
            if (err) {
                return reject(err);
            }

            resolve({
                schoolId: result.insertId,
                affectedRows: result.affectedRows,
            });
        });
    });
};

export const deleteSchoolByID = (schoolId) => {
    const sql = `
    DELETE FROM schools
    WHERE school_id = ?;
  `;

    return new Promise((resolve, reject) => {
        pool.query(sql, [schoolId], (err, result) => {
            if (err) return reject(err);

            resolve({
                schoolId,
                affectedRows: result.affectedRows,
            });
        });
    });
};
