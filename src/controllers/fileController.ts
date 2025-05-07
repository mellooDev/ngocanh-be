import { Request, Response } from "express";
import { MinioService } from "../services/minio.service";

export class FileController {
    private minioService: MinioService;

    constructor() {
        this.minioService = new MinioService();
    }

    async uploadFile(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
              }
        
              const folder = req.user?.role_name || 'common';
              const { url, key } = await this.minioService.uploadFile(req.file, folder);
        
              res.json({
                message: 'File uploaded successfully',
                url,
                key,
              });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteFile(req: Request, res: Response) {
        try {
          const { key } = req.params;
          await this.minioService.deleteFile(key);
          res.json({ message: 'File deleted successfully' });
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
    
      async getPresignedUrl(req: Request, res: Response) {
        try {
          const { key } = req.params;
          const url = await this.minioService.getPresignedUrl(key);
          res.json({ url });
        } catch (error: any) {
          res.status(500).json({ error: error.message });
        }
      }
}