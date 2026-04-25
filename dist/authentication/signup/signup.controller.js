import { singupUser } from "./signup.service.js";
export const signupUserController = async (req, res, next) => {
    const { token } = await singupUser(req.body);
    return res.status(200).json({ isSuccess: true, token });
};
//# sourceMappingURL=signup.controller.js.map