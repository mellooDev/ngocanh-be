import { Database } from "./../config/database";
import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class InstructionProcessRepository {
    constructor(private db: Database) {}

    async getMajors(
        searchTerm: string,
        page: number,
        pageSize: number
    ): Promise<any> {
        try {
            const sql = "select * from search_majors($1, $2, $3)";
            const values = [searchTerm || null || "", page, pageSize];
            const result = await this.db.query(sql, values);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async createInstruction(instructions: any): Promise<void> {
        try {
            const now = new Date();
            const processId = uuidv4();
            const process = {
                ...instructions.process,
                id: processId,
                created_at: now,
                updated_at: now,
            };

            const steps = instructions.steps.map((step: any) => ({
                ...step,
                id: step.id || uuidv4(),
                created_at: now,
                updated_at: now,
            }));
            const finalPayload = {
                process,
                steps,
            };

            const instructionJson = JSON.stringify(finalPayload);
            const sql = "CALL insert_instruction_process($1)";
            const result = await this.db.query(sql, [instructionJson]);

            return result.rows;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
