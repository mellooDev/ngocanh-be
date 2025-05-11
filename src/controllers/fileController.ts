import { Request, Response } from "express";
import { MinioService } from "../services/minio.service";
import { UploadedFilesService } from "../services/uploadFiles.service";
import { injectable } from "tsyringe";
import { FileConversionService } from "../services/fileConversion.service";

@injectable()
export class FileController {
    constructor(
        private minioService: MinioService,
        private uploadedFilesService: UploadedFilesService,
        private fileConversionService: FileConversionService
    ) {}

    // ✅ Admin upload file dùng chung
    async uploadFile(req: Request, res: Response): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).json({ error: "No file uploaded" });
                return;
            }

            // Lưu vào thư mục "shared" trong bucket
            const folder = "shared";
            const { url, key } = await this.minioService.uploadFile(
                req.file,
                folder
            );

            // Giả định req.user chứa thông tin người dùng đang đăng nhập
            const uploaderId = "null"; // fallback nếu chưa tích hợp auth

            const fileName = req.file.originalname;
            const fileKey = key;

            await this.uploadedFilesService.saveFile(
                uploaderId,
                fileName,
                fileKey
            );

            res.json({
                message: "File uploaded successfully",
                url,
                key,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async uploadFilePdf(req: Request, res: Response): Promise<void> {
        try {
            console.log("req.file:", req.file);
            const file = req.file;

            if (!file) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }

            const result = await this.fileConversionService.handleFileUpload(
                file,
                "documents"
            );
            res.status(200).json(result);
        } catch (error) {
            console.error("Upload error:", error);
            res.status(500).json({ message: "File upload failed", error });
        }
    }

    // ✅ Admin hoặc hệ thống xóa file
    async deleteFile(req: Request, res: Response) {
        try {
            const { key } = req.params;
            await this.minioService.deleteFile(key);
            await this.uploadedFilesService.deleteByKey(key);
            res.json({ message: "File deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ Sinh viên lấy presigned url để tải file
    async getPresignedUrl(req: Request, res: Response) {
        try {
            const { key } = req.params;
            console.log("key: ", key);

            const url = await this.minioService.getPresignedUrl(key);
            res.status(200).json({
                message: "Lấy danh sách chuyên ngành thành công",
                results: true,
                data: url,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // ✅ Sinh viên lấy danh sách file dùng chung
    async getSharedFiles(req: Request, res: Response) {
        try {
            const action = req.body;
            const result = await this.uploadedFilesService.getAllFiles(action);

            res.status(200).json({
                message: "Lấy danh sách file thành công",
                results: true,
                data: result.data,
                recordsTotal: result.pagination.total,
                page: result.pagination.currentPage,
                pageSize: action.pageSize,
                totalPages: result.pagination.totalPages,
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
