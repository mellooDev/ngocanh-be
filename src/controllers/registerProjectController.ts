import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { MajorService } from "../services/majors.service";
import { Request, Response } from "express";
import { ProjectSessionService } from "../services/projectSession.service";
import { RegisterProjectService } from "../services/registerProject.service";

@injectable()
export class RegisterProjectController {
    constructor(private registerProjectService: RegisterProjectService) {}

    async searchProjectForStudent(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.registerProjectService.searchProjectForStudent(
                action.studentId,
                action.projectRoundId,
                action.page,
                action.pageSize,
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách thành công",
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

    async searchStudentRound(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.registerProjectService.searchStudentRound(
                action.studentId,
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách thành công",
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

    async studentRegisterProject(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.registerProjectService.studentRegisterProject(
                action.projectId,
                action.studentId,
            );

            if (result) {
                res.status(200).json({
                    message: "Đăng ký thành công",
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

    async studentPurposeProject(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.registerProjectService.studentPurposeProject(
                action.projectName,
                action.description,
                action.projectRoundId,
                action.studentId,
                action.lecturerId,
                action.defenseMode,
                action.projectCode,
            );

            if (result) {
                res.status(200).json({
                    message: "Đề xuất đề tài thành công. Thông tin sẽ được gửi đến giảng viên hướng dẫn.",
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

    async getLecturerInRound(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.registerProjectService.getLecturerInRound(
                action.projectRoundId,
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách thành công",
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
