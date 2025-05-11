import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { MajorService } from "../services/majors.service";
import { Request, Response } from "express";
import { ProjectSessionService } from "../services/projectSession.service";
import { RegisterProjectService } from "../services/registerProject.service";
import { ApproveProjectService } from "../services/approveProject.service";

@injectable()
export class ApproveProjectController {
    constructor(private approveProjectService: ApproveProjectService) {}

    async getPendingProjectForLecturer(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.approveProjectService.getPendingProjectForLecturer(
                action.projectRoundId,
                action.lecturerId,
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

    async getPendingProjectForDean(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.approveProjectService.getPendingProjectForDean(
                action.projectRoundId,
                action.deanId,
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

    async lecturerApproveProject(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.approveProjectService.lecturerApproveProject(
                action.projectRequestId,
            );

            if (result) {
                res.status(200).json({
                    message: "Phê duyệt thành công. Đề tài sẽ được gửi đến trưởng bộ môn phê duyệt",
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

    async deanApproveProject(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.approveProjectService.deanApproveProject(
                action.projectRequestId,
            );

            if (result) {
                res.status(200).json({
                    message: "Phê duyệt thành công. Thông tin sẽ được gửi đến email của sinh viên.",
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

    
    async searchLecturerRound(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.approveProjectService.searchLecturerRound(
                action.lecturerId,
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