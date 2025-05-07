import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { MajorService } from "../services/majors.service";
import { Request, Response } from "express";

@injectable()
export class MajorController {
    constructor(private majorService: MajorService) {}

    async getMajors(req: Request, res: Response): Promise<void> {
        try {
            const action = req.body as MajorSearchDTO;
            const result = await this.majorService.getMajors(
                action.major_name,
                action.page,
                action.pageSize
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách chuyên ngành thành công",
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

    async createMajors(req: Request, res: Response): Promise<void> {
        try {
            const majors: Majors[] = req.body;
            if (!Array.isArray(majors)) {
                res.status(400).json({
                    message: "Dữ liệu đầu vào phải là một mảng",
                    results: false,
                });
            }
            for (const major of majors) {
                if (!major.major_name || !major.department_id) {
                    res.status(400).json({
                        message: "Chuyên ngành phải có id, tên và khoa",
                        results: false,
                    });
                }
            }

            const result = await this.majorService.createMajors(majors);
            if (result) {
                res.status(200).json({
                    statusCode: 200,
                    message: "Thêm chuyên ngành thành công",
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
