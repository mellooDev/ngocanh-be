import { injectable } from "tsyringe";
import { MajorRepository } from "../repositories/majorRepository";
import { Majors } from "../models/major.model";
import { ProjectSessionRepository } from "../repositories/projectSessionRepository";
import {
    ProjectRound,
    ProjectSession,
    ProjectSessionSetting,
} from "../models/projectSession.model";
import { v4 as uuidv4 } from "uuid";
import { RoundSessionRepository } from "../repositories/roundSessionRepository";

@injectable()
export class RoundSessionService {
    constructor(private roundSessionRepository: RoundSessionRepository) {}

    async searchRound(
        sessionName: string,
        roundNumber: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        const result = await this.roundSessionRepository.searchRound(
            sessionName,
            roundNumber,
            page,
            pageSize
        );

        return {
            data: result.map((row: any) => ({
                id: row.id,
                project_session_name: row.project_session_name,
                round_number: row.round_number,
                start_date: row.start_date,
                description: row.description,
                created_at: row.created_at,
                updated_at: row.updated_at,
            })),
            pagination: {
                total: result[0]?.total_count || 0,
                totalPages: result[0]?.total_pages || 1,
                currentPage: result[0]?.current_page || page,
            },
        };
    }

    async getStudentRound(
        roundId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        const result = await this.roundSessionRepository.getStudentRound(
            roundId,
            page,
            pageSize
        );

        return {
            data: result.map((row: any) => ({
                id: row.id,
                student_code: row.student_code,
                fullname: row.fullname,
                class_code: row.class_code,
                created_at: row.created_at,
                updated_at: row.updated_at,
            })),
            pagination: {
                total: result[0]?.total_count || 0,
                totalPages: result[0]?.total_pages || 1,
                currentPage: result[0]?.current_page || page,
            },
        };
    }

    async addStudentToRound(roundId: string, students: any[]): Promise<any> {
        try {
            await this.roundSessionRepository.addStudentToRound(
                roundId,
                students
            );
            return { message: "Students successfully added to round." };
        } catch (error: any) {
            throw new Error(`Service error: ${error.message}`);
        }
    }
}
