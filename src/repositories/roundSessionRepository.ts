import { Database } from "./../config/database";
import { injectable } from "tsyringe";
import {v4 as uuidv4} from 'uuid';

@injectable()
export class RoundSessionRepository {
    constructor(private db: Database) {}

    async searchRound(
        sessionName: string,
        roundNumber: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = 'select * from search_project_rounds($1, $2, $3, $4)';
            const values = [sessionName || null || '', roundNumber || null || '', page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async getStudentRound(
        roundId: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = 'select * from search_student_rounds($1, $2, $3)';
            const values = [roundId, page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    
    async addLecturerToSession(majors: any[]): Promise<void> {
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

    async addStudentToRound(roundId: string, students: any[]): Promise<void> {
        try {
          const now = new Date();
          const studentsWithMeta = students.map((item) => ({
            id: uuidv4(),
            student_id: item.student_id,
            created_at: now.toISOString(),
            updated_at: now.toISOString(),
          }));
      
          const studentsJson = JSON.stringify(studentsWithMeta);
      
          const sql = 'CALL add_students_to_round($1, $2)';
          await this.db.query(sql, [roundId, studentsJson]);
      
        } catch (error: any) {
          throw new Error(error.message);
        }
      }

}
