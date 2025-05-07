import { Database } from './../config/database';
import { injectable } from "tsyringe";

@injectable()
export class RoleRepository {
    constructor(private db: Database) {}

    async getRoles(): Promise<any> {
        try {
            const sql = "select * from roles";
            await this.db.query(sql, []);
            return true;
        } catch (error) {
            
        }
    }
}