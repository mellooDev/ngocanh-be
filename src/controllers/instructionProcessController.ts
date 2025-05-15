import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { MajorService } from "../services/majors.service";
import { Request, Response } from "express";
import { InstructionProcessService } from "../services/instructionProcess.service";

@injectable()
export class InstructionProcessController {
    constructor(private instructionProcessService: InstructionProcessService) {}

    // async getMajors(req: Request, res: Response): Promise<void> {
    //     try {
    //         const action = req.body as MajorSearchDTO;
    //         const result = await this.majorService.getMajors(
    //             action.major_name,
    //             action.page,
    //             action.pageSize
    //         );

    //         if (result) {
    //             res.status(200).json({
    //                 message: "Lấy danh sách chuyên ngành thành công",
    //                 results: true,
    //                 data: result.data,
    //                 recordsTotal: result.pagination.total,
    //                 page: result.pagination.currentPage,
    //                 pageSize: action.pageSize,
    //                 totalPages: result.pagination.totalPages,
    //             });
    //         }
    //     } catch (error: any) {
    //         res.status(500).json({
    //             message: error.message || "Lỗi server",
    //             results: false,
    //         });
    //     }
    // }

    async createInstructionProcess(req: Request, res: Response): Promise<void> {
        try {
            const instructions = req.body;

            const result = await this.instructionProcessService.createInstruction(instructions);
            if (result) {
                res.status(200).json({
                    statusCode: 200,
                    message: "Thêm quy trình hướng dẫn thành công",
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
