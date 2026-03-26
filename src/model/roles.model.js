import pool from "../database/db.js";
export const findRoles = () => {
    const sql = `SELECT * from roles `;
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

export const insertRole = (connection = null, newRole) => {
    const db = connection || pool;
    const sql = `INSERT INTO roles (role,school_id) VALUES (?,?)`;
    return new Promise((resolve, reject) => {
        db.query(sql, newRole, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve({ roleId: results.insertId });
        });
    });
};
