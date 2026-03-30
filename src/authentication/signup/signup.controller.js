import { singupUser } from "./signup.service.js";
import { catchAsync } from "../../util/catchAsync.js";

export const signupUserController = catchAsync(async (req, res, next) => {
    const { token } = await singupUser(req.body);

    return res.status(200).json({ isSuccess: true, token });
});
