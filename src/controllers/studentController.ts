import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { MajorService } from "../services/majors.service";
import { Request, Response } from "express";
import { StudentService } from "../services/student.service";
import { InsertStudentDto, StudentSearchDTO } from "../models/student.model";

@injectable()
export class StudentController {
    constructor(private studentService: StudentService) {}

    async getStudents(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body as StudentSearchDTO;
            const result = await this.studentService.searchStudent(
                action.studentName,
                action.studentCode,
                action.classCode,
                action.status,
                action.page,
                action.pageSize
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách sinh viên thành công",
                    results: true,
                    data: result.data,
                    recordsTotal: result.pagination.total,
                    page: result.pagination.currentPage,
                    pageSize: action.pageSize,
                    totalPages: result.pagination.totalPages,
                });
            }
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Lỗi server",
                results: false,
            });
        }
    }

    async createStudent(req: Request, res: Response): Promise<void> {
        try {
            const students: InsertStudentDto[] = req.body;

            const result = await this.studentService.createStudents(students);
            if (result) {
                res.status(200).json({
                    statusCode: 200,
                    message: "Thêm sinh viên thành công",
                    results: true,
                    data: result.data,
                });
            }
        } catch (error: any) {
            res.status(500).json({
                message: error.message || "Lỗi server",
                results: false,
            });
        }
    }
}
