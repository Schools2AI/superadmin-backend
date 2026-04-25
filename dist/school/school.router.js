import express from "express";
import { getAllSchoolDetailsController, createNewSchoolController, updateSchoolFieldController, deleteSchoolController, getSchoolDetailsController, } from "./school.controller.js";
import { RBAC } from "../middleware/RBAC.middleware.js";
const router = express.Router();
router.get("/all-school-details", RBAC("SCHOOL:VIEW"), getAllSchoolDetailsController);
router.get("/view/:id", getSchoolDetailsController);
router.post("/create", RBAC("SCHOOL:CREATE"), createNewSchoolController);
router.patch("/update/:id", updateSchoolFieldController);
router.delete("/delete/:id", deleteSchoolController);
export default router;
//# sourceMappingURL=school.router.js.map