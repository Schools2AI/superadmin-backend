import express from "express";
const router = express.Router();
import { createFeatureController, getFeatureController, toggleFeatureController, } from "./features.controller.js";
router.post("/create", createFeatureController);
router.get("/view/:id", getFeatureController);
router.post("/toggle", toggleFeatureController);
export default router;
//# sourceMappingURL=features.router.js.map