import { Database } from './../config/database';
import { injectable } from "tsyringe";
import {v4 as uuidv4} from 'uuid';


@injectable()
export class ClassRepository {
    constructor(private db: Database) {}

    async getClass(): Promise<any> {
        try {
            const sql = "select * from roles";
            await this.db.query(sql, []);
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createClasses(classes: any[]): Promise<void> {
        try {
            const now = new Date();
            const classesWithId = classes.map((item) => ({
                id: uuidv4(),
                class_name: item.class_name,
                major_id: item.major_id,
                created_at: now,
                updated_at: now,
            }));
            const majorJson = JSON.stringify(classesWithId);
            const sql = 'CALL insert_classes($1)';
            const result = await this.db.query(sql, [majorJson]);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

}