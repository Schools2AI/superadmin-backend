import express from "express";
const router = express.Router();
import {
    createFeatureController,
    getFeatureController,
    toggleFeatureController,
} from "./features.controller.ts";
import { RBAC } from "../middleware/RBAC.middleware.ts";

router.post("/create",RBAC("FEATURE:CREATE"), createFeatureController);
router.get("/view/:id",RBAC("FEATURE:VIEW"), getFeatureController);
router.post("/toggle",RBAC("FEATURE:EDIT"), toggleFeatureController);

export default router;
