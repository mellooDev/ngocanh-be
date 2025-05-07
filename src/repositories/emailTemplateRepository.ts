import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { EmailTemplate } from "../models/emailTemplate.model";

@injectable()
export class EmailTemplateRepository {
    constructor(private db: Database) {}

    async getEmailTemplates(): Promise<any> {
        try {
            const sql = "select * from email_templates";
            const result = await this.db.query(sql, []);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }


    async getEmailTemplateByCode(code: string): Promise<any> {
        try {
            const sql = 'select * from EmailTemplate where code = $1';

            const result = await this.db.query(sql, [code]);
            return result.rows[0];
        } catch (error) {
            throw error;
            
        }
    }

    // async createEmailTemplate(template: EmailTemplate) {
    //     try {
    //         const sql = 'insert into email_templates (code, subject, body) values ($1, $2, $3)';
    //         const result = await this.db.query(sql, template.id, template.title, template.code, template.content, template.createdAt, template.creeatedBy);
    //     } catch (error) {
    //         throw error;
            
    //     }
    // }

}