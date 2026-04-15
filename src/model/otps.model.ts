import pool from "../database/db.ts";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export const insertOtp = async (value: [string, string, string]) => {
    const sql = `
    INSERT INTO otps (user_identifier, otp, expires_at)
    VALUES (?, ?, ?)
  `;

    const [result] = await pool.execute<ResultSetHeader>(sql, value);

    return result.insertId;
};

export const findOtp = async (value: [string]) => {
    const sql = `
    SELECT otp
    FROM otps
    WHERE user_identifier = ?
      AND expires_at > NOW()
    LIMIT 1
  `;

    const [rows] = await pool.execute<RowDataPacket[]>(sql, value);

    return rows.length > 0 ? rows[0] : null;
};

export const removeExpiredOtp = async () => {
    const sql = `
    DELETE FROM otps
    WHERE expires_at <= NOW()
  `;

    const [result] = await pool.execute<ResultSetHeader>(sql);

    return result.affectedRows;
};
