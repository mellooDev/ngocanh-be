import { Router } from 'express';
import actionRouter from './sendEmailRouter';
import majorRouter from './majorRouter';
import authRouter from './userRouter';
import projectSessionRouter from './projectSessionRouter';
import academicYearRouter from './academicYearRouter';
import studentRouter from './studentRouter';
import roundSessionRouter from './roundSessionRouter';
const router = Router();

router.use('/action', actionRouter);
router.use('/major', majorRouter);
router.use('/auth', authRouter);
router.use('/projectSession', projectSessionRouter);
router.use('/academicYear', academicYearRouter);
router.use('/student', studentRouter);
router.use('/round', roundSessionRouter);
export default router;
