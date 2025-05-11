import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import { FileController } from '../controllers/fileController';

const upload = multer({ storage: multer.memoryStorage() });
const fileRouter = Router();
const fileController = container.resolve(FileController);

fileRouter.post(
  '/upload',
  upload.single('file'),
  fileController.uploadFile.bind(fileController)
);

fileRouter.post(
    '/uploadPdf',
    upload.single('file'),
    fileController.uploadFilePdf.bind(fileController)
  );

  fileRouter.post(
    '/getFiles',
    fileController.getSharedFiles.bind(fileController)
  );

fileRouter.delete('/:key', fileController.deleteFile);
fileRouter.get('/presigned/:key', fileController.getPresignedUrl);

export default fileRouter;