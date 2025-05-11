import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import * as libre from "libreoffice-convert";
import { MinioService } from "./minio.service";
import { UploadedFilesRepository } from "../repositories/uploadFilesRepository";

@injectable()
export class FileConversionService {
    constructor(
        private uploadedFilesRepo: UploadedFilesRepository,
        private minioService: MinioService
    ) {}

    async convertToPdf(inputPath: string, outputPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const inputFile = fs.readFileSync(inputPath);
            const outputFormat = "pdf"; // Định dạng đầu ra là PDF
            const filter = undefined;

            libre.convert(
                inputFile,
                outputFormat,
                filter,
                (err: any, output: Buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        fs.writeFileSync(outputPath, output); // Lưu file PDF vào đường dẫn đã chỉ định
                        resolve();
                    }
                }
            );
        });
    }

    async saveFile(
        uploaderId: string,
        fileName: string,
        fileKey: string
    ): Promise<void> {
        const fileUploadId = uuidv4();
        await this.uploadedFilesRepo.insertFile(
            fileUploadId,
            uploaderId,
            fileName,
            fileKey
        );
    }

    async handleFileUpload(
        file: Express.Multer.File,
        folderPath: string
    ): Promise<{ url: string; key: string }> {
        const tempDir = path.join(__dirname, "temp");
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
    
        const tempFilePath = path.join(tempDir, file.originalname);
        fs.writeFileSync(tempFilePath, file.buffer);
    
        const outputPdfPath = tempFilePath.replace(path.extname(file.originalname), ".pdf");
        await this.convertToPdf(tempFilePath, outputPdfPath);
    
        const fileNamePdf = file.originalname.replace(path.extname(file.originalname), ".pdf");

        const pdfBuffer = fs.readFileSync(outputPdfPath);
        const { url, key } = await this.minioService.uploadBuffer(pdfBuffer, fileNamePdf, folderPath);
    
        const uploaderId = "null"; // fallback nếu chưa tích hợp auth
        await this.saveFile(uploaderId, file.originalname, key);
    
        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(outputPdfPath);
    
        return { url, key };
    }
    
}
