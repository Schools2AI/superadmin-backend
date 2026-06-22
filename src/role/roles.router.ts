import express from "express";
const router = express.Router();
import {
    getRolesController,
    createRolesController,
} from "./roles.controller.ts";
import { RBAC } from "../middleware/RBAC.middleware.ts";

router.get("/all-roles",getRolesController);
router.post("/create", createRolesController);
export default router;
