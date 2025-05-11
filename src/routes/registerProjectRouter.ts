import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { authenticate } from '../middlewares/auth.middlewares';
import { ProjectSessionController } from '../controllers/projectSessionController';
import { RegisterProjectController } from '../controllers/registerProjectController';

const registerProjectRouter = Router();
const registerProjectController = container.resolve(RegisterProjectController);
registerProjectRouter.post(
    '/getProjectForStudent',
    registerProjectController.searchProjectForStudent.bind(registerProjectController),
);

registerProjectRouter.post(
    '/searchStudentRound',
    registerProjectController.searchStudentRound.bind(registerProjectController),
);

registerProjectRouter.post(
    '/studentRegister',
    registerProjectController.studentRegisterProject.bind(registerProjectController),
);

registerProjectRouter.post(
    '/studentPurposeProject',
    registerProjectController.studentPurposeProject.bind(registerProjectController),
);

registerProjectRouter.post(
    '/getLecturerInRound',
    registerProjectController.getLecturerInRound.bind(registerProjectController),
);

export default registerProjectRouter;
