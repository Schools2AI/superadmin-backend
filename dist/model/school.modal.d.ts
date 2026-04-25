import type { PoolConnection } from "mysql2/promise";
import type { newSchool } from "../validation/schoolValidation.ts";
export declare const findAllSchool: () => Promise<import("mysql2/promise").QueryResult>;
export declare const findSchoolById: (value: string[]) => Promise<import("mysql2/promise").QueryResult>;
export declare const insertSchool: (newSchoolDetails: newSchool, connection?: PoolConnection | null) => Promise<{
    schoolId: number;
}>;
export declare const updateSchoolFieldByID: (schoolId: string, field: string, value: string) => Promise<{
    schoolId: string;
    affectedRows: number;
}>;
export declare const deleteSchoolByID: (schoolId: string) => Promise<{
    schoolId: string;
    affectedRows: number;
}>;
