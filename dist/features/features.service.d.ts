export declare const createFeature: (newFeature: {
    feature_name: string;
    description: string;
}) => Promise<void>;
export declare const getFeature: (id: string) => Promise<import("mysql2").QueryResult>;
export declare const toggleFeature: ({ featureId, schoolId, }: {
    featureId: string;
    schoolId: string;
}) => Promise<import("mysql2").QueryResult>;
