import type { Request, Response, NextFunction } from "express";
export declare const loginUserController: (req: Request, res: Response) => Promise<void>;
export declare const sendOtpController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyOtpController: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logoutController: (req: Request, res: Response) => Response<any, Record<string, any>>;
