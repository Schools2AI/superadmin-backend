import express from "express";
const router = express.Router();
import {
    createFeatureController,
    getFeatureController,
    toggleFeatureController,
} from "./features.controller.ts";

router.post("/create", createFeatureController);
router.get("/view/:id", getFeatureController);
router.post("/toggle", toggleFeatureController);

export default router;
