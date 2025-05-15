import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { authenticate } from '../middlewares/auth.middlewares';
import { InstructionProcessController } from '../controllers/instructionProcessController';

const instructionProcessRouter = Router();
const instructionProcessController = container.resolve(InstructionProcessController);


instructionProcessRouter.post(
    '/createInstructionProcess',
    instructionProcessController.createInstructionProcess.bind(instructionProcessController)
)


export default instructionProcessRouter;
