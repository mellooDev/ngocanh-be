// students.service.ts
import { injectable } from "tsyringe";
import { MajorRepository } from "../repositories/majorRepository";
import { Majors } from "../models/major.model";
import { ProjectSessionRepository } from "../repositories/projectSessionRepository";
import {
    ProjectRound,
    ProjectSession,
    ProjectSessionSetting,
} from "../models/projectSession.model";
import { v4 as uuidv4 } from "uuid";
import { StudentRepository } from "../repositories/studentRepository";
import { InsertStudentDto } from "../models/student.model";
import * as bcrypt from "bcrypt";

@injectable()
export class StudentService {
    constructor(private studentRepository: StudentRepository) {}

    async searchStudent(
        studentName: string,
        studentCode: string,
        classCode: string,
        status: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        const result = await this.studentRepository.searchStudent(
            studentName,
            studentCode,
            classCode,
            status,
            page,
            pageSize
        );

        return {
            data: result.map((row: any) => ({
                id: row.id,
                student_id: row.student_id,
                student_code: row.student_code,
                fullname: row.fullname,
                email: row.email,
                phone_number: row.phone_number,
                class_code: row.class_code,
                status: row.status,
                created_at: row.created_at,
                updated_at: row.updated_at,
            })),
            pagination: {
                total: result[0]?.total_count || 0,
                totalPages: result[0]?.total_pages || 1,
                currentPage: result[0]?.current_page || page,
            },
        };
    }

    async createStudents(data: InsertStudentDto[]): Promise<any> {
        const saltRounds = 10;

        const hashedData = await Promise.all(
            data.map(async (student) => {
                const user_id = uuidv4();
                const student_id = uuidv4();

                return {
                    ...student,
                    user_id,
                    id: student_id,
                    password: await bcrypt.hash(student.password, saltRounds),
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                };
            })
        );

        return this.studentRepository.createStudent(hashedData);
    }
}
