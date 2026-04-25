import type { RowDataPacket } from "mysql2/promise";
export declare const insertOtp: (value: (string | number | Date)[]) => Promise<number>;
export declare const findOtp: (value: [string]) => Promise<RowDataPacket | null>;
export declare const removeExpiredOtp: () => Promise<number>;
