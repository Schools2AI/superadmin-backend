import express from "express"
import {getPermissions,updatedPermission,getAllPermissions} from "./permission.controller.ts"
const router = express.Router()

router.get("/by-role",getPermissions);
router.get("/",getAllPermissions);
router.post("/update",updatedPermission)

export default router