import { injectable } from "tsyringe";
import { MajorRepository } from "../repositories/majorRepository";
import { Majors } from "../models/major.model";
import { ProjectSessionRepository } from "../repositories/projectSessionRepository";
import {
    ProjectRound,
    ProjectSession,
    ProjectSessionSetting,
} from "../models/projectSession.model";
import {v4 as uuidv4} from 'uuid';


@injectable()
export class ProjectSessionService {
    constructor(private projectSessionRepository: ProjectSessionRepository) {}

    async searchProjectSession(
        sessionCode: string,
        sessionName: string,
        yearName: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        const result = await this.projectSessionRepository.searchSession(
            sessionCode, sessionName, yearName, page, pageSize
        );
    
        return {
            data: result.map((row: any) => ({
                id: row.id,
                project_session_name: row.project_session_name,
                project_session_code: row.project_session_code,
                year_name: row.year_name,
                start_date: row.start_date,
                description: row.description,
                status: row.status,
                created_at: row.created_at,
                updated_at: row.updated_at,
            })),
            pagination: {
                total: result[0]?.total_count || 0,
                totalPages: result[0]?.total_pages || 1,
                currentPage: result[0]?.current_page || page,
            }
        };
    }
    
    async createProjectSession(data: {
        session: ProjectSession;
        rounds: ProjectRound[];
        settings: ProjectSessionSetting[];
    }): Promise<any> {
        const { session, rounds = [], settings = [] } = data;

        const now = new Date().toISOString();

        const sessionData = {
            id: session.id || uuidv4(),
            project_session_name: session.project_session_name,
            project_session_code: session.project_session_code,
            start_date: session.start_date,
            type: session.type,
            major_id: session.major_id,
            academic_year_id: session.academic_year_id,
            description: session.description,
            status: session.status,
            created_at: now,
            updated_at: now,
        };

        const processedRounds = rounds.map((round: any) => ({
            id: round.id || uuidv4(),
            round_number: round.round_number,
            start_date: round.start_date,
            description: round.description,
            created_at: now,
            updated_at: now,
        }));

        const processedSettings = settings.map((setting: any) => ({
            id: setting.id || uuidv4(),
            allow_topic_registration: setting.allow_topic_registration ? 1 : 0,
            allow_cross_department_registration:
                setting.allow_cross_department_registration ? 1 : 0,
            allow_report_out_of_week: setting.allow_report_out_of_week ? 1 : 0,
            allow_evaluator_out_of_week: setting.allow_evaluator_out_of_week
                ? 1
                : 0,
            allow_topic_modification: setting.allow_topic_modification ? 1 : 0,
        }));

        const fullData = {
            session: sessionData,
            rounds: processedRounds,
            settings: processedSettings,
        };

        return this.projectSessionRepository.createProjectSession(fullData);
    }
}
