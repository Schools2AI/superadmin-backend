import type { newSchool } from "../validation/schoolValidation.ts";
export declare const getAllSchoolDetails: () => Promise<import("mysql2").QueryResult>;
export declare const getSchoolDetails: (id: string) => Promise<import("mysql2").QueryResult>;
export declare const createNewSchool: (newSchoolDetails: newSchool) => Promise<{
    email: string;
    password: string;
}>;
export declare const updateSchoolField: (schoolId: string, field: string, value: string) => Promise<{
    schoolId: string;
    affectedRows: number;
}>;
export declare const deleteSchool: (schoolId: string) => Promise<{
    schoolId: string;
    affectedRows: number;
}>;
