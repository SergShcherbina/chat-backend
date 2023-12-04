import express, {Router} from 'express'
import {authController} from "../controllers/authController";
import {check} from 'express-validator';

export const authRouter: Router = express.Router()

authRouter.post('/registration',
    [
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль должен быть не менее 4 и не более 10 символов').isLength({min: 4, max: 10})
    ],
    authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/users', authController.getUsers)