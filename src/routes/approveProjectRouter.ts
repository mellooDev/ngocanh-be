import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { authenticate } from '../middlewares/auth.middlewares';
import { ApproveProjectController } from '../controllers/approveProjectController';

const approveProjectRouter = Router();
const approveProjectController = container.resolve(ApproveProjectController);
approveProjectRouter.post(
    '/getPendingLecturerProject',
    approveProjectController.getPendingProjectForLecturer.bind(approveProjectController),
);

approveProjectRouter.post(
    '/getPendingDeanProject',
    approveProjectController.getPendingProjectForDean.bind(approveProjectController),
);

approveProjectRouter.post(
    '/lecturerApproveProject',
    approveProjectController.lecturerApproveProject.bind(approveProjectController),
);

approveProjectRouter.post(
    '/deanApproveProject',
    approveProjectController.deanApproveProject.bind(approveProjectController),
);

approveProjectRouter.post(
    '/searchLecturerRound',
    approveProjectController.searchLecturerRound.bind(approveProjectController),
);

export default approveProjectRouter;