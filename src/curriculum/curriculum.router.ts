import express from "express"
import {classes, subject,stream,chapter,createChapter,deleteChapter,createSubject,deleteSubject} from "./curriculum.controller.ts"
import { authMiddleware } from "../middleware/auth.middleware.ts"
import { RBAC } from "../middleware/RBAC.middleware.ts"
const router = express.Router()
//get classes
router.get("/class",RBAC("CURRICULUM:VIEW"),classes)
//get subject
router.get("/class/:classId/subject",RBAC("CURRICULUM:VIEW"),subject)
//get stream
router.get("/stream",RBAC("CURRICULUM:VIEW"),stream)
//get chapter
router.get("/class/:classId/subject/:subjectId/chapter",RBAC("CURRICULUM:VIEW"),chapter)
//Post chapter
router.post("/chapter",RBAC("CURRICULUM:CREATE"),createChapter)
// Delete chapter
router.delete("chapter/:chapterId",RBAC("CURRICULUM:DELETE"),deleteChapter)
// post subject
router.post("/subject",RBAC("CURRICULUM:CREATE"),createSubject)
// Delete subject 
router.delete("/subject/:subjectId",RBAC("CURRICULUM:DELETE"),deleteSubject)

export default router