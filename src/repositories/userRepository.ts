import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Users } from "../models/user.model";

@injectable()
export class UserRepository {
    constructor (private db: Database) {}

    async findUserById(id: string): Promise<any> {
        try {
            const sql = "select * from Users where id = $1";
            const result = await this.db.query(sql, [id]);

            return result.rows[0];
        } catch (error) {
            
        }
    }

    async findUserByUsernameOrEmail(userNameOrEmail: string): Promise<Users | null> {
        try {
            const sql = 'select * from login_user($1)';

            const result = await this.db.query(sql, [userNameOrEmail]);

            return result.rows[0] || null;
        } catch (error) {
            console.error('Error finding user by username or email:', error);
            throw new Error('Failed to fetch user by username or email');
        }
    }
}