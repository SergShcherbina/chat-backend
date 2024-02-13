import express, { Router } from 'express'
import { authController } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";
import {checkInput} from "../validation/checkInput";

export const authRouter: Router = express.Router()

authRouter.post('/registration', checkInput, authController.registration);
authRouter.post('/login',checkInput ,authController.login);
authRouter.get('/me', authMiddleware, authController.me);
authRouter.get('/logout', authMiddleware, authController.me);
authRouter.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)