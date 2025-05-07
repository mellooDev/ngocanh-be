import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { RoundSessionService } from "../services/roundSession.service";

@injectable()
export class RoundSessionController {
    constructor(private roundSessionService: RoundSessionService) {}

    async searchRound(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.roundSessionService.searchRound(
                action.sessionName,
                action.roundNumber,
                action.page,
                action.pageSize,
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách round thành công",
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

    async getStudentRound(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body;
            const result = await this.roundSessionService.getStudentRound(
                action.roundId,
                action.page,
                action.pageSize,
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách sinh viên của round thành công",
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

    async addStudentToRound(req: Request, res: Response): Promise<void> {
        try {
          const { roundId, students } = req.body;
    
          const result = await this.roundSessionService.addStudentToRound(roundId, students);

          if(result) {
              res.status(200).json({
                message: "Cập nhật sinh viên thành công",
                results: true,
                data: result.data,
              });

          }
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
      }

}
