import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { MajorController } from '../controllers/majorController';
import { authenticate } from '../middlewares/auth.middlewares';
import { StudentController } from '../controllers/studentController';

const studentRouter = Router();
const studentController = container.resolve(StudentController);
studentRouter.post(
    '/getStudents',
    studentController.getStudents.bind(studentController),
);

studentRouter.post(
    '/createStudent',
    studentController.createStudent.bind(studentController)
)


export default studentRouter;
