import type { PoolConnection } from "mysql2/promise";
export declare const insertFeature: (value: string[]) => Promise<import("mysql2/promise").QueryResult>;
export declare const populateSchoolFeatures: (value: number[], connection?: PoolConnection | null) => Promise<import("mysql2/promise").QueryResult>;
export declare const findFeatureById: (value: string[]) => Promise<import("mysql2/promise").QueryResult>;
export declare const toggleFeatureModel: (value: string[]) => Promise<import("mysql2/promise").QueryResult>;
