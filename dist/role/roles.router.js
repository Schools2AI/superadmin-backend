import express from "express";
const router = express.Router();
import { getRolesController, createRolesController, } from "./roles.controller.js";
router.get("/all-roles", getRolesController);
router.post("/create", createRolesController);
export default router;
//# sourceMappingURL=roles.router.js.map