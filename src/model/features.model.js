import pool from "../database/db.js";
export const insertFeature = (value) => {
    const sql = `INSERT INTO features (feature_name ,description) VALUES (?.?)`;
    return new Promise((resolve, reject) => {
        pool.query(sql, value, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

export const populateSchoolFeatures = (connection = null, value) => {
    const db = connection || pool;
    const sql = `INSERT INTO school_features (school_id, feature_id)
SELECT ?, id FROM features;
`;

    return new Promise((resolve, reject) => {
        db.query(sql, value, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

export const findFeatureById = (value) => {
    const sql = `SELECT 
    sf.feature_id,
    f.feature_name,
    sf.is_enabled
FROM school_features sf
JOIN features f 
    ON sf.feature_id = f.id
WHERE sf.school_id = ?;
`;
    return new Promise((resolve, reject) => {
        pool.query(sql, value, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};

export const toggleFeatureModel = (value) => {
    const sql = `UPDATE school_features
SET is_enabled = NOT is_enabled,
    enabled_at = CASE 
        WHEN is_enabled = 0 THEN NOW()
        ELSE NULL
    END
WHERE school_id = ?
  AND feature_id = ?;

`;
    return new Promise((resolve, reject) => {
        pool.query(sql, value, (error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
    });
};
