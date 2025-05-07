import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { authenticate } from '../middlewares/auth.middlewares';
import { ProjectSessionController } from '../controllers/projectSessionController';
import { RoundSessionController } from '../controllers/roundSessionController';

const roundSessionRouter = Router();
const roundSessionController = container.resolve(RoundSessionController);
roundSessionRouter.post(
    '/getRound',
    roundSessionController.searchRound.bind(roundSessionController),
);

roundSessionRouter.post(
    '/addStudent',
    roundSessionController.addStudentToRound.bind(roundSessionController),
);

roundSessionRouter.post(
    '/getRoundStudent',
    roundSessionController.getStudentRound.bind(roundSessionController),
);


export default roundSessionRouter;
