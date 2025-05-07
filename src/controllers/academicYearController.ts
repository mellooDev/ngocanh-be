import { Majors, MajorSearchDTO } from "./../models/major.model";
import { injectable } from "tsyringe";
import { MajorService } from "../services/majors.service";
import { Request, Response } from "express";
import { AcademicYearService } from "../services/academicYear.service";

@injectable()
export class AcademicYearController {
    constructor(private academicYearService: AcademicYearService) {}

    async getAllYear(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.academicYearService.getAllYear(
                
            );

            if (result) {
                res.status(200).json({
                    message: "Lấy danh sách năm học thành công",
                    results: true,
                    data: result
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
