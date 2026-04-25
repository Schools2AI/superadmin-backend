import type { Request, Response } from "express";
export declare const getAllSchoolDetailsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getSchoolDetailsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createNewSchoolController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateSchoolFieldController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSchoolController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
