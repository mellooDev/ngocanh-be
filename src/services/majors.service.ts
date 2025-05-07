import { injectable } from "tsyringe";
import { MajorRepository } from "../repositories/majorRepository";
import { Majors } from "../models/major.model";

@injectable()
export class MajorService {
    constructor(private majorRepository: MajorRepository) {}

    async getMajors(
        searchTerm: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        const majors = await this.majorRepository.getMajors(
            searchTerm,
            page,
            pageSize
        );

        return {
            data: majors.map((m: any) => ({
                id: m.id,
                major_name: m.major_name,
                department_id: m.department_id,
                department_name: m.department_name,
                created_at: m.created_at,
                updated_at: m.updated_at,
            })),
            pagination: {
                total: majors[0]?.total_count || 0,
                totalPages: majors[0]?.total_pages || 1,
                currentPage: majors[0]?.current_page || page,
            },
            
        };
    }

    async createMajors(majors: Majors[]): Promise<any> {
        return this.majorRepository.createMajors(majors);
    }
}
