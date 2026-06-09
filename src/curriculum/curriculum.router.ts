import express from "express"
import {classes, subject,stream,chapter,createChapter,deleteChapter,createSubject,deleteSubject} from "./curriculum.controller.ts"
import { authMiddleware } from "../middleware/auth.middleware.ts"
const router = express.Router()
//get classes
router.get("/class",authMiddleware,classes)
//get subject
router.get("/class/:classId/subject",authMiddleware,subject)
//get stream
router.get("/stream",authMiddleware,stream)
//get chapter
router.get("/class/:classId/subject/:subjectId/chapter",authMiddleware,chapter)
//Post chapter
router.post("/chapter",authMiddleware,createChapter)
// Delete chapter
router.delete("chapter/:chapterId",authMiddleware,deleteChapter)
// post subject
router.post("/subject",authMiddleware,createSubject)
// Delete subject 
router.delete("/subject/:subjectId",authMiddleware,deleteSubject)

export default router