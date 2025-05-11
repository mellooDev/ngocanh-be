import { Database } from "./../config/database";
import { injectable } from "tsyringe";
import {v4 as uuidv4} from 'uuid';

@injectable()
export class ApproveProjectRepository {
    constructor(private db: Database) {}

    async getPendingProjectForLecturer(
        projectRoundId: string,
        lecturerId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = 'select * from get_pending_projects_for_lecturer($1, $2, $3, $4)';
            const values = [projectRoundId, lecturerId, page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getPendingProjectForDean(
        projectRoundId: string,
        deanId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = 'select * from get_pending_projects_for_dean($1, $2, $3, $4)';
            const values = [projectRoundId, deanId, page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async lecturerApproveProject(
        projectRequestId: string,
    ): Promise<any> {
        try {
            const sql = 'call lecturer_approve_project($1)';
            const values = [projectRequestId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async deanApproveProject(
        projectRequestId: string,
    ): Promise<any> {
        try {
            const sql = 'call dean_approve_project($1)';
            const values = [projectRequestId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async searchLecturerRound(
        lecturerId: string,
    ): Promise<any> {
        try {
            const sql = 'select * from get_rounds_by_lecturer_id($1)';
            const values = [lecturerId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getDeanByRequestId(
        projectRequestId: string,
    ): Promise<any> {
        try {
            const sql = 'select * from get_dean_by_request_id($1)';
            const values = [projectRequestId];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}