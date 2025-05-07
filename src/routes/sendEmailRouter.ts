import { Router } from 'express';
import { container } from 'tsyringe';
import { EmailController } from '../controllers/sendMailController';

const actionRouter = Router();
const actionController = container.resolve(EmailController);

actionRouter.post(
    '/send-email',
    (req, res) => actionController.sendEmail(req, res)
);

export default actionRouter;