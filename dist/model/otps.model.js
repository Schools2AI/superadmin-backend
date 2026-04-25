import pool from "../database/db.js";
export const insertOtp = async (value) => {
    const sql = `
    INSERT INTO otps (user_identifier, otp, expires_at)
    VALUES (?, ?, ?)
  `;
    const [result] = await pool.execute(sql, value);
    return result.insertId;
};
export const findOtp = async (value) => {
    const sql = `
    SELECT otp
    FROM otps
    WHERE user_identifier = ?
      AND expires_at > NOW()
    LIMIT 1
  `;
    const [rows] = await pool.execute(sql, value);
    return rows.length > 0 ? rows[0] : null;
};
export const removeExpiredOtp = async () => {
    const sql = `
    DELETE FROM otps
    WHERE expires_at <= NOW()
  `;
    const [result] = await pool.execute(sql);
    return result.affectedRows;
};
//# sourceMappingURL=otps.model.js.map