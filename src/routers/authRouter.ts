import express, { Router } from 'express'
import { authController } from "../controllers/authController";
import { check } from 'express-validator';
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

export const authRouter: Router = express.Router()

authRouter.post('/registration',
    [
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль должен быть не менее 4 и не более 20 символов').isLength({ min: 4, max: 20 })
    ],
    authController.registration)
authRouter.post('/login',
    [
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль должен быть не менее 4 и не более 20 символов').isLength({ min: 4, max: 20 })
    ],
    authController.login)
authRouter.get('/users', roleMiddleware(['ADMIN']), authController.getUsers)