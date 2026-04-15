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
