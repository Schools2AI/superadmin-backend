import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../database/db.ts";

export const fetchPermissionsById = async (
    value: string[],
    connection = null,
) => {
    const db = connection || pool;
    const sql = `
        SELECT p.name
        FROM permissions p
        JOIN role_permissions rp ON rp.permission_id = p.id
        WHERE rp.role_id = ?
    `;

    const [results] = await db.query<RowDataPacket[]>(sql, [value]);
    return results as { name: string }[];
};
