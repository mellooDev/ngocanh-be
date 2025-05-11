import * as Minio from "minio";
import { minioConfig } from "../config/minio";
import { injectable } from "tsyringe";

@injectable()
export class MinioService {
    private minioClient: Minio.Client;
    private bucketName: string;

    constructor() {
        this.minioClient = new Minio.Client({
            endPoint: minioConfig.endPoint,
            port: minioConfig.port,
            useSSL: minioConfig.useSSL,
            accessKey: minioConfig.accessKey,
            secretKey: minioConfig.secretKey,
        });

        this.bucketName = minioConfig.bucketName;
        this.initializeBucket();
    }

    private async initializeBucket(): Promise<void> {
        const bucketExists = await this.minioClient.bucketExists(
            this.bucketName
        );
        if (!bucketExists) {
            await this.minioClient.makeBucket(this.bucketName, "");
            await this.minioClient.setBucketPolicy(
                this.bucketName,
                JSON.stringify({
                    Version: "2012-10-17",
                    Statement: [
                        {
                            Effect: "Allow",
                            Principal: "*",
                            Action: ["s3:GetObject"],
                            Resource: [`arn:aws:s3:::${this.bucketName}/*`],
                        },
                    ],
                })
            );
        }
    }

    async uploadFile(
        file: Express.Multer.File,
        folderPath: string = ""
    ): Promise<{ url: string; key: string }> {
        const timestamp = Date.now();

        const extension = file.originalname.split(".").pop();
        const originalFileName = file.originalname;

        const key = `${folderPath}/${originalFileName}`.replace(/^\/+/, "");

        await this.minioClient.putObject(
            this.bucketName,
            key,
            file.buffer,
            file.size,
            {
                "Content-Type": file.mimetype,
            }
        );

        const url = `${minioConfig.endPoint}:${minioConfig.port}/${this.bucketName}/${key}`;
        return { url, key };
    }

    async uploadBuffer(
        buffer: Buffer,
        fileName: string,
        folderPath: string,
        contentType: string = 'application/pdf'
    ): Promise<{ url: string; key: string }> {
        const key = `${folderPath}/${fileName}`.replace(/^\/+/, '');
    
        await this.minioClient.putObject(
            this.bucketName,
            key,
            buffer,
            buffer.length,
            { 'Content-Type': contentType }
        );
    
        const url = `${minioConfig.endPoint}:${minioConfig.port}/${this.bucketName}/${key}`;
        return { url, key };
    }
    

    async deleteFile(key: string): Promise<void> {
        await this.minioClient.removeObject(this.bucketName, key);
    }

    async getFileUrl(key: string): Promise<string> {
        return `${minioConfig.endPoint}:${minioConfig.port}/${this.bucketName}/${key}`;
    }

    async getPresignedUrl(
        key: string,
        expiry: number = 24 * 60 * 60
    ): Promise<string> {
        return this.minioClient.presignedGetObject(
            this.bucketName,
            key,
            expiry
        );
    }
}
