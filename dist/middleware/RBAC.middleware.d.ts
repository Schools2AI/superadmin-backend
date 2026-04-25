import type { Request, Response, NextFunction } from "express";
export declare const RBAC: (accessLabel: string) => (req: Request, res: Response, next: NextFunction) => void;
