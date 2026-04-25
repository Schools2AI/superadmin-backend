import type { PoolConnection } from "mysql2/promise";
export declare const findRoles: () => Promise<import("mysql2/promise").QueryResult>;
export declare const getRoleIdFromAdminRole: (role: string[], connection?: PoolConnection | null) => Promise<any>;
export declare const insertRole: (connection: null | undefined, role: string) => Promise<number>;
