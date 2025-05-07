import { Database } from "./../config/database";
import { injectable } from "tsyringe";
import {v4 as uuidv4} from 'uuid';
import { InsertStudentDto } from "../models/student.model";

@injectable()
export class StudentRepository {
    constructor(private db: Database) {}

    async searchStudent(
        studentName: string,
        studentCode: string,
        classCode: string,
        status: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = 'select * from search_student($1, $2, $3, $4, $5, $6)';
            const values = [studentName || null || '', studentCode || null || '', classCode || null || '', status || null || '', page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createStudent(students: InsertStudentDto[]): Promise<void> {
        try {
            const jsonData = JSON.stringify(students);
            const sql = 'CALL insert_student($1)';
            const result = await this.db.query(sql, [jsonData]);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // async updateProjectSession(majors: any[]): Promise<void> {
    //     try {
    //         const now = new Date();
    //         const majorsWithId = majors.map((item) => ({
    //             id: uuidv4(),
    //             major_name: item.major_name,
    //             department_id: item.department_id,
    //             created_at: now,
    //             updated_at: now,
    //         }));
    //         const majorJson = JSON.stringify(majorsWithId);
    //         const sql = 'CALL insert_majors($1)';
    //         const result = await this.db.query(sql, [majorJson]);

    //         return result.rows;
    //     } catch (error: any) {
    //         throw new Error(error.message);
    //     }
    // }

}
