import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { MajorController } from '../controllers/majorController';
import { authenticate } from '../middlewares/auth.middlewares';

const majorRouter = Router();
const majorController = container.resolve(MajorController);
majorRouter.post(
    '/getMajor',
    authenticate,
    majorController.getMajors.bind(majorController),
);

majorRouter.post(
    '/createMajor',
    majorController.createMajors.bind(majorController)
)


export default majorRouter;
