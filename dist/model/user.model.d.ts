import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
export declare const findUserByMobile: (mobile: string) => Promise<RowDataPacket>;
export declare const findUserByEmail: (email: string) => Promise<RowDataPacket>;
export declare const insertSchoolAdmin: (values: string[], connection?: PoolConnection | null) => Promise<import("mysql2/promise").QueryResult>;
export declare const insertUser: (values: (string | number)[], connection?: null) => Promise<ResultSetHeader>;
