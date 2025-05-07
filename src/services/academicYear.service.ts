import { injectable } from "tsyringe";
import { MajorRepository } from "../repositories/majorRepository";
import { Majors } from "../models/major.model";
import { AcademicYearRepository } from "../repositories/academicRepository";

@injectable()
export class AcademicYearService {
    constructor(private academicYearRepository: AcademicYearRepository) {}

    async getAllYear(): Promise<any> {
        return this.academicYearRepository.getAllYear();
    }
}
