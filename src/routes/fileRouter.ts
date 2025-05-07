// import { Router } from 'express';
// import multer from 'multer';
// import { FileController } from '../controllers/fileController';
// import { authenticate } from '../middlewares/auth.middleware';

// const upload = multer({ storage: multer.memoryStorage() });
// const router = Router();
// const fileController = new FileController();

// router.post(
//   '/upload',
//   authenticate,
//   upload.single('file'),
//   fileController.uploadFile
// );

// router.delete('/:key', authenticate, fileController.deleteFile);
// router.get('/presigned/:key', authenticate, fileController.getPresignedUrl);

// export default router;