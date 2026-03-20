import express from "express";
import authRouter from "./authentication/auth.router.js";
import schoolRouter from "./school/school.router.js";
import helmet from "helmet";
import rolesRouter from "./role/roles.router.js";
import featuresRouter from "./features/features.router.js";
import cors from "cors";
import { authMiddleware } from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import setupDatabase from "./database/setup_db.js";

const app = express();

// Initialize database
setupDatabase().catch((err) => {
    console.error("Failed to initialize database:", err);
});

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());

app.use("/auth", authRouter);
app.use("/school", authMiddleware, schoolRouter);
app.use("/roles", authMiddleware, rolesRouter);
app.use("/features", authMiddleware, featuresRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
});
