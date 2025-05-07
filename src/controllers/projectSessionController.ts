import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { MajorService } from "../services/majors.service";
import { Request, Response } from "express";
import { ProjectSessionService } from "../services/projectSession.service";

@injectable()
export class ProjectSessionController {
    constructor(private projectSessionService: ProjectSessionService) {}

    async searchSession(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.projectSessionService.searchProjectSession(
                action.sessionCode,
                action.sessionName,
                action.yearName,
                action.page,
                action.pageSize,
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách đợt thành công",
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

    async createProjectSession(req: Request, res: Response): Promise<any> {
        try {
            const { session, rounds, settings } = req.body;

            // Kiểm tra phần session
            if (
                !session ||
                !session.project_session_name ||
                !session.project_session_code
            ) {
                return res.status(400).json({
                    message: "Thông tin session không đầy đủ",
                    results: false,
                });
            }

            if (rounds && !Array.isArray(rounds)) {
                return res.status(400).json({
                    message: "Rounds phải là một mảng",
                    results: false,
                });
            }
            if (settings && !Array.isArray(settings)) {
                return res.status(400).json({
                    message: "Settings phải là một mảng",
                    results: false,
                });
            }

            const result = await this.projectSessionService.createProjectSession({
                session,
                rounds,
                settings
            });
            if (result) {
                res.status(200).json({
                    statusCode: 200,
                    message: "Thêm đợt đồ án thành công",
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
