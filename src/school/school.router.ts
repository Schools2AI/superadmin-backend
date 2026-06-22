import express from "express";
import {
    getAllSchoolDetailsController,
    createNewSchoolController,
    updateSchoolFieldController,
    deleteSchoolController,
    getSchoolDetailsController,
} from "./school.controller.ts";
import { RBAC } from "../middleware/RBAC.middleware.ts";
const router = express.Router();

router.get(
    "/all-school-details",
    RBAC("SCHOOL:VIEW"),
    getAllSchoolDetailsController,
);
router.get("/view/:id",RBAC("SCHOOL:VIEW"), getSchoolDetailsController);
router.post("/create", RBAC("SCHOOL:CREATE"), createNewSchoolController);
router.patch("/update/:id",RBAC("SCHOOL:EDIT"), updateSchoolFieldController);
router.delete("/delete/:id",RBAC("SCHOOL:DELETE"), deleteSchoolController);

export default router;
