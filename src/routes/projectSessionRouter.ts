import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { authenticate } from '../middlewares/auth.middlewares';
import { ProjectSessionController } from '../controllers/projectSessionController';

const projectSessionRouter = Router();
const projectSessionController = container.resolve(ProjectSessionController);
projectSessionRouter.post(
    '/getSession',
    projectSessionController.searchSession.bind(projectSessionController),
);

projectSessionRouter.post(
    '/createProjectSession',
    projectSessionController.createProjectSession.bind(projectSessionController)
)


export default projectSessionRouter;
