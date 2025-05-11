import { injectable } from "tsyringe";
import { UploadedFilesRepository } from "../repositories/uploadFilesRepository";
import { v4 as uuidv4 } from "uuid";
import { MinioService } from "./minio.service";


@injectable()
export class UploadedFilesService {
    constructor(private uploadedFilesRepo: UploadedFilesRepository, private minioService: MinioService) {}

    async saveFile(
        uploaderId: string,
        fileName: string,
        fileKey: string
    ) {
        const fileUploadId = uuidv4();

        return this.uploadedFilesRepo.insertFile(fileUploadId, uploaderId, fileName, fileKey);
    }

    async getAllFiles(params: {
        keyword?: string;
        page: number;
        pageSize: number;
    }) {
        const files = await this.uploadedFilesRepo.getFiles(params);

    return {
        data: await Promise.all(
            files.map(async (file: any) => ({
                name: file.file_name,
                key: file.file_key,
                url: await this.minioService.getPresignedUrl(file.file_key),
                created_at: file.created_at,
            }))
        ),
        pagination: {
            total: files[0]?.total_count || 0,
            totalPages: files[0]?.total_pages || 1,
            currentPage: files[0]?.current_page || params.page,
        },
    };
    }

    async deleteByKey(fileKey: string) {
        return this.uploadedFilesRepo.deleteFile(fileKey);
    }
    
}
