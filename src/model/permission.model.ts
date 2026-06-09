import type { ResultSetHeader, RowDataPacket,PoolConnection, Pool } from "mysql2";
import pool from "../database/db.ts";

export const fetchPermissionsById = async (
    value: string[] | string,
    connection = null,
) => {
    const db = connection || pool;
    const sql = `
        SELECT p.name ,p.description,p.category
        FROM permissions p
        JOIN role_permissions rp ON rp.permission_id = p.id
        WHERE rp.role_id = ?
    `;

    const [results] = await db.query<RowDataPacket[]>(sql, [value]);
    return results as { name: string }[];
};


export const updateRolePermissions = async (
    roleId: number,
    permissionsToAdd: number[],
    permissionsToRemove: number[],
    connection  = null,
) => {
    const db  = connection || pool;

    const execute = async () => {
        // Add permissions
        if (permissionsToAdd.length) {
            const values = permissionsToAdd.map(permissionId => [
                roleId,
                permissionId,
            ]);

            await db.query<ResultSetHeader>(
                `
                INSERT IGNORE INTO role_permissions
                (role_id, permission_id)
                VALUES ?
                `,
                [values]
            );
        }

        // Remove permissions
        if (permissionsToRemove.length) {
            await db.query<ResultSetHeader>(
                `
                DELETE FROM role_permissions
                WHERE role_id = ?
                AND permission_id IN (?)
                `,
                [roleId, permissionsToRemove]
            );
        }
    };

    // If external transaction exists
    if (connection) {
        await execute();
        return;
    }

    // Create transaction
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction();

        if (permissionsToAdd.length) {
            const values = permissionsToAdd.map(permissionId => [
                roleId,
                permissionId,
            ]);

            await conn.query<ResultSetHeader>(
                `
                INSERT IGNORE INTO role_permissions
                (role_id, permission_id)
                VALUES ?
                `,
                [values]
            );
        }

        if (permissionsToRemove.length) {
            await conn.query<ResultSetHeader>(
                `
                DELETE FROM role_permissions
                WHERE role_id = ?
                AND permission_id IN (?)
                `,
                [roleId, permissionsToRemove]
            );
        }

        await conn.commit();
    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};




export const fetchAllPermissions = async (
    connection = null,
) => {
    const db = connection || pool;
    const sql = `
        SELECT *
        FROM permissions 
        
    `;

    const [results] = await db.query<RowDataPacket[]>(sql);
    return results as { name: string }[];
};