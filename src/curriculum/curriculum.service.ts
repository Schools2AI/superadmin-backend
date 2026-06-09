
const curriculamServer = process.env.CURRICULAM_SERVER_URL

class CurriculumService {

    async allClass() {
        const res = await fetch(`${curriculamServer}/api/v1/class/all`)

        return res.json()
    }



    async allSubject(classId: string | number, board: string, streamId: string | number) {
        const res = await fetch(`${curriculamServer}/api/v1/class/${classId}/subject/all?board=${board}&streamId=${streamId}`)

        return res.json()
    }



    async stream() {
        const res = await fetch(`${curriculamServer}/api/v1/stream`)

        return res.json()
    }



    async allChapter({ classId, board, streamId, subjectId, lang }: { classId: string | number; board: string; streamId: string | number; subjectId: string | number; lang: string }) {
        
        const res = await fetch(`${curriculamServer}/api/v1/class/${classId}/subject/${subjectId}/chapter/all?board=${board}&streamId=${streamId}&lang=${lang}`)

        return res.json()
    }



    async createSubject({
        subjectName,
        board,
        streamId,
        classIds,
        
    }: {
        subjectName: string;
        board: string;
        streamId: string | number;
        classIds?: number[];
        
    }) {
        const res = await fetch(
            `${curriculamServer}/api/v1/subject`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subjectName,
                    board,
                    streamId,
                    classIds,
                   
                }),
            }
        );

        return res.json();
    }

    async deleteSubject(
        subjectId: string | number
    ) {
        const res = await fetch(
            `${curriculamServer}/api/v1/subject/${subjectId}`,
            {
                method: "DELETE",
            }
        );

        return res.json();
    }



    async createChapter({
        name,
        subjectId,
        language,
    }: {
        name: string;
        subjectId: string | number;
        language: string;
    }) {
        const res = await fetch(
            `${curriculamServer}/api/v1/chapter`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    subjectId,
                    language,
                }),
            }
        );

        return res.json();
    }

    async deleteChapter(
        chapterId: string | number
    ) {
        const res = await fetch(
            `${curriculamServer}/api/v1/chapter/${chapterId}`,
            {
                method: "DELETE",
            }
        );

        return res.json();
    }

}

export default new CurriculumService()