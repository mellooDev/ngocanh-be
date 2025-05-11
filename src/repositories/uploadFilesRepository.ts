import { Database } from "./../config/database";
import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class UploadedFilesRepository {
    constructor(private db: Database) {}

    async insertFile(
        id: string,
        uploaderId: string,
        fileName: string,
        fileKey: string,
    ) {
        const sql = "CALL insert_uploaded_file($1, $2, $3, $4)";
        const values = [id, uploaderId, fileName, fileKey];
        const result = await this.db.query(sql, values);
        return result;
    }

    async deleteFile(fileKey: string) {
        const sql = "CALL delete_uploaded_file_by_key($1)";
        const values = [fileKey];
        const result = await this.db.query(sql, values);
        return result;
    }

    async getFiles(params: {
        keyword?: string;
        page: number;
        pageSize: number;
    }) {
        const { keyword = "", page, pageSize } = params;

        const sql = "SELECT * FROM get_all_shared_files($1, $2, $3)";
        const values = [keyword, page, pageSize];

        const result = await this.db.query(sql, values);
        return result.rows;
    }
}
