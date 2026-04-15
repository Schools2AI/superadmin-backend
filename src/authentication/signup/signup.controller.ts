import { singupUser } from "./signup.service.ts";
import type { Request, Response, NextFunction } from "express";

export const signupUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { token } = await singupUser(req.body);

    return res.status(200).json({ isSuccess: true, token });
};
