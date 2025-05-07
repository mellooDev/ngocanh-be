import { NextFunction, Response, Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/userController';

const authRouter = Router();
const authController = container.resolve(UserController);
authRouter.post(
    '/login',
    authController.login,
);



export default authRouter;
