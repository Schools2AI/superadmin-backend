import type { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user: UserPayload;
        }
    }
}

export interface UserPayload extends JwtPayload {
    userPermissions: string[];
}

export interface NewSchoolDetails {
    schoolName: string;
    country: string;
    state: string;
    city: string;
    pincode: string;

    cost: number;
    studentCount: number;
    teacherCount: number;
    classCount: number;

    language: string;
    board: string;
    status: string;

    website: string;
    domains: string[];

    email: string;
    mobileNo: string;

    timeZone: string;
}
