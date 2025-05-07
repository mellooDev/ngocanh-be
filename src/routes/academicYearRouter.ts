import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { MajorController } from '../controllers/majorController';
import { authenticate } from '../middlewares/auth.middlewares';
import { AcademicYearController } from '../controllers/academicYearController';

const academicYearRouter = Router();
const academicYearController = container.resolve(AcademicYearController);
academicYearRouter.get(
    '/getYear',
    academicYearController.getAllYear.bind(academicYearController),
);


export default academicYearRouter;
