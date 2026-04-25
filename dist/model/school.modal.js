import pool from "../database/db.js";
export const findAllSchool = async () => {
    const sql = "SELECT * FROM schools";
    const [result] = await pool.query(sql);
    return result;
};
export const findSchoolById = async (value) => {
    const sql = "SELECT * FROM schools WHERE id = ?";
    const [result] = await pool.query(sql, value);
    return result;
};
export const insertSchool = async (newSchoolDetails, connection = null) => {
    const schoolDetailsArray = [
        newSchoolDetails.schoolName,
        newSchoolDetails.country,
        newSchoolDetails.state,
        newSchoolDetails.city,
        newSchoolDetails.pincode,
        newSchoolDetails.cost,
        newSchoolDetails.studentCount,
        newSchoolDetails.teacherCount,
        newSchoolDetails.language,
        newSchoolDetails.board,
        newSchoolDetails.status,
        newSchoolDetails.website,
        newSchoolDetails.domains,
        newSchoolDetails.timeZone,
        newSchoolDetails.classCount,
    ];
    const sql = `
        INSERT INTO schools (
            school_name,
            country,
            state,
            city,
            pincode,
            cost,
            student_count,
            teacher_count,
            language_preference,
            board,
            status,
            website_enabled,
            allowed_domains,
            timezone,
            class_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?)
    `;
    const db = connection || pool;
    const [result] = await db.execute(sql, schoolDetailsArray);
    // console.log("insertSchool");
    return {
        schoolId: result.insertId,
    };
};
export const updateSchoolFieldByID = async (schoolId, field, value) => {
    const sql = `
    UPDATE schools
    SET
     ${field} = ?
    WHERE id = ?;
  `;
    const [result] = await pool.execute(sql, [
        value,
        schoolId,
    ]);
    return {
        schoolId,
        affectedRows: result.affectedRows,
    };
};
export const deleteSchoolByID = async (schoolId) => {
    const sql = `
    DELETE FROM schools
    WHERE id = ?;
  `;
    const [result] = await pool.execute(sql, [schoolId]);
    return {
        schoolId,
        affectedRows: result.affectedRows,
    };
};
//# sourceMappingURL=school.modal.js.map