import express from "express";
import authRouter from "./authentication/auth.router.ts";
import schoolRouter from "./school/school.router.ts";
import helmet from "helmet";
import rolesRouter from "./role/roles.router.ts";
import featuresRouter from "./features/features.router.ts";
import cors from "cors";
import { authMiddleware } from "./middleware/auth.middleware.ts";
import { errorHandler } from "./middleware/errorHandler.ts";
import dotEnv from "dotenv";
dotEnv.config({ path: process.cwd() + "/config.env" });

import setupDatabase from "./database/setup_db.ts";

const app = express();

// Initialize database
setupDatabase().catch((err: Error) => {
    console.error("Failed to initialize database:", err);
});

app.use(express.json({ limit: "10kb" }));

// app.use(helmet());
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use("/auth", authRouter);
app.use("/school", authMiddleware, schoolRouter);
app.use("/roles", authMiddleware, rolesRouter);
app.use("/features", authMiddleware, featuresRouter);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
});
