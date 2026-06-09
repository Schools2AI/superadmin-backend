import type { Request, Response } from "express"
import CurriculumService from "./curriculum.service.ts"

export async function classes(req: Request, res: Response) {



    const data = await CurriculumService.allClass();
    return res.status(200).json(data);

}

export async function subject(req: Request, res: Response) {

    const classId = String(req.params.classId);
    const board = String(req.query.board ?? "")
    const streamId = String(req.query.streamId ?? "")



    const data = await CurriculumService.allSubject(classId, board, streamId);
    return res.status(200).json(data);


}

export async function stream(req: Request, res: Response) {
    const data = await CurriculumService.stream();
    return res.status(200).json(data);

}

export async function chapter(req: Request, res: Response) {

    const classId = String(req.params.classId);
    const subjectId = String(req.params.subjectId);
    const board = String(req.query.board ?? "")
    const streamId = String(req.query.streamId ?? "")
    const lang = String(req.query.lang ?? "")


    const data = await CurriculumService.allChapter({ classId, board, streamId, subjectId, lang });
    return res.status(200).json(data);


}

export async function createSubject(req: Request, res: Response) {

    const {
        subjectName,
        board,
        streamId,
        classIds,
       
    } = req.body
   

    const data = await CurriculumService.createSubject({
        subjectName,
        board,
        streamId,
        classIds,
        
    })
    return res.status(200).json(data);
    
}

export async function deleteSubject(req: Request, res: Response) {

    const subjectId = String(req.params.subjectId);

    const data  = await CurriculumService.deleteSubject(subjectId)
    return res.status(200).json(data);
    
}

export async function createChapter(req: Request, res: Response) {
    const {
        name,
        subjectId,
        language,
    } = req.body

    const data = await CurriculumService.createChapter({
        name,
        subjectId,
        language,
    })
    return res.status(200).json(data);
}

export async function deleteChapter(req: Request, res: Response) {

    const chapterId = String(req.params.chapterId);

    const data  = await CurriculumService.deleteChapter(chapterId)
    return res.status(200).json(data);
    
}

