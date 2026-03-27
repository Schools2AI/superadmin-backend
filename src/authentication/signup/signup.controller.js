import { singupUser } from "./signup.service.js";
export const signupUserController = async (req, res) => {
    try {
        const { token } = await singupUser(req.body);

        // set cookie
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     maxAge: 60 * 60 * 1000,
        // });

        return res.status(200).json({ isSuccess: true, token });
    } catch (error) {
        console.log(error);
        const status = error.status || 500;
        const message = error.message || "Something went wrong";
        res.status(status).send(message);
    }
};
