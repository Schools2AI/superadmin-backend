import type { Request, Response } from "express";
export declare const createFeatureController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getFeatureController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const toggleFeatureController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
