import type { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import pool from "../database/db.ts";
import type { NewSchoolDetails } from "../type/type.d.ts";

export const findAllSchool = async () => {
    const sql = "SELECT * FROM schools";
    const [result] = await pool.query(sql);
    return result;
};

export const findSchoolById = async (value: string[]) => {
    const sql = "SELECT * FROM schools WHERE id = ?";
    const [result] = await pool.query(sql, value);
    return result;
};

export const insertSchool = async (
    newSchoolDetails: NewSchoolDetails,
    connection: PoolConnection | null = null,
) => {
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

    const db: Pool | PoolConnection = connection || pool;
    const [result] = await db.execute<ResultSetHeader>(sql, schoolDetailsArray);
    // console.log("insertSchool");

    return {
        schoolId: result.insertId,
    };
};

export const updateSchoolFieldByID = async (
    schoolId: string,
    field: string,
    value: string,
) => {
    const sql = `
    UPDATE schools
    SET
     ${field} = ?
    WHERE id = ?;
  `;

    const [result] = await pool.execute<ResultSetHeader>(sql, [
        value,
        schoolId,
    ]);

    return {
        schoolId,
        affectedRows: result.affectedRows,
    };
};

export const deleteSchoolByID = async (schoolId: string) => {
    const sql = `
    DELETE FROM schools
    WHERE id = ?;
  `;

    const [result] = await pool.execute<ResultSetHeader>(sql, [schoolId]);

    return {
        schoolId,
        affectedRows: result.affectedRows,
    };
};
