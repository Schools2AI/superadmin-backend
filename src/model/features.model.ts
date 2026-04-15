import pool from "../database/db.ts";
import type { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
export const insertFeature = async (value: string[]) => {
    const sql = `INSERT INTO features (feature_name ,description) VALUES (?, ?)`;
    const [result] = await pool.execute(sql, value);
    return result;
};

export const populateSchoolFeatures = async (
    value: number[],
    connection: PoolConnection | null = null,
) => {
    const db = connection || pool;
    const sql = `INSERT INTO school_features (school_id, feature_id)
SELECT ?, id FROM features;
`;
    const [result] = await db.execute(sql, value);
    console.log("populateSchoolFeatures");
    return result;
};

export const findFeatureById = async (value: string[]) => {
    const sql = `SELECT 
    sf.feature_id,
    f.feature_name,
    sf.is_enabled
FROM school_features sf
JOIN features f 
    ON sf.feature_id = f.id
WHERE sf.school_id = ?;
`;
    const [result] = await pool.query(sql, value);
    return result;
};

export const toggleFeatureModel = async (value: string[]) => {
    const sql = `UPDATE school_features
SET is_enabled = NOT is_enabled,
    enabled_at = CASE 
        WHEN is_enabled = 0 THEN NOW()
        ELSE NULL
    END
WHERE school_id = ?
  AND feature_id = ?;

`;
    const [result] = await pool.execute(sql, value);
    return result;
};
