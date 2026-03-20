import jwt from "jsonwebtoken";

// export const authMiddleware = (req, res, next) => {
//     try {
//         const token = req.cookies?.token;
//         // console.log(req.cookies.token);
//         if (!token) {
//             return res.status(401).json({
//                 isSuccess: false,
//                 message: "Authentication token missing",
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded;

//         next();
//     } catch (error) {
//         return res.status(401).json({
//             isSuccess: false,
//             message: "Invalid or expired token",
//         });
//     }
// };

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            isSuccess: false,
            message: "JWT token missing",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { id, role }
        next();
    } catch (error) {
        res.status(403).json({
            isSuccess: false,
            message: "Invalid token",
        });
    }
};
