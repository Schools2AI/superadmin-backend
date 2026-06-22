import express from "express"
import {getPermissions,updatedPermission,getAllPermissions} from "./permission.controller.ts"
import { RBAC } from "../middleware/RBAC.middleware.ts";
const router = express.Router()

router.get("/by-role",RBAC("PERMISSION:VIEW"),getPermissions);
router.get("/",RBAC("PERMISSION:VIEW"),getAllPermissions);
router.post("/update",RBAC("PERMISSION:EDIT"),updatedPermission)

export default router