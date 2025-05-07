import { Database } from "./../config/database";
import { injectable } from "tsyringe";
import {v4 as uuidv4} from 'uuid';

@injectable()
export class ProjectSessionRepository {
    constructor(private db: Database) {}

    async searchSession(
        sessionCode: string,
        sessionName: string,
        yearName: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = 'select * from search_project_session($1, $2, $3, $4, $5)';
            const values = [sessionCode || null || '', sessionName || null || '', yearName || null || '', page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createProjectSession(projectSession: any): Promise<void> {
        try {
            const jsonData = JSON.stringify(projectSession);
            const sql = 'CALL insert_project_session($1)';
            const result = await this.db.query(sql, [jsonData]);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async updateProjectSession(majors: any[]): Promise<void> {
        try {
            const now = new Date();
            const majorsWithId = majors.map((item) => ({
                id: uuidv4(),
                major_name: item.major_name,
                department_id: item.department_id,
                created_at: now,
                updated_at: now,
            }));
            const majorJson = JSON.stringify(majorsWithId);
            const sql = 'CALL insert_majors($1)';
            const result = await this.db.query(sql, [majorJson]);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}
