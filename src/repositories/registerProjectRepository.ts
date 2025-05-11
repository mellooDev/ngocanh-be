import { Database } from "./../config/database";
import { injectable } from "tsyringe";
import {v4 as uuidv4} from 'uuid';

@injectable()
export class RegisterProjectRepository {
    constructor(private db: Database) {}

    async searchProjectForStudent(
        studentId: string,
        projectRoundId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = 'select * from search_projects_for_student($1, $2, $3, $4)';
            const values = [studentId, projectRoundId, page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async searchStudentRound(
        studentId: string,
    ): Promise<any> {
        try {
            const sql = 'select * from get_rounds_by_student_id($1)';
            const values = [studentId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async studentRegisterProject(
        projectId: string,
        studentId: string,
    ): Promise<any> {
        try {
            const sql = 'CALL student_register_project($1, $2)';
            const values = [projectId, studentId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async getProjectRegistrationInfo(
        projectId: string,
    ): Promise<any> {
        try {
            const sql = 'select * from get_project_registration_info($1)';
            const values = [projectId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    async studentPurposeProject(
        projectId: string,
        projectName: string,
        description: string,
        projectRoundId: string,
        studentId: string,
        lecturerId: string,
        defenseMode: string,
        projectCode: string,
        requestId: string,
    ): Promise<any> {
        try {
            const sql = 'CALL student_propose_project($1, $2, $3, $4, $5, $6, $7, $8, $9)';
            const values = [projectId, projectName, description, projectRoundId, studentId, lecturerId, defenseMode, projectCode, requestId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getLecturerInRound(
        projectRoundId: string,
    ): Promise<any> {
        try {
            const sql = 'select * from get_lecturers_by_project_round($1)';
            const values = [projectRoundId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}
