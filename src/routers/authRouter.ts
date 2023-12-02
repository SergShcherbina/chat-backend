import express, {Router} from 'express'
import {authController} from "../controllers/authController";

export const authRrouter: Router = express.Router()

authRrouter.post('/registration', authController.registration)
authRrouter.post('/login', authController.login)
authRrouter.get('/users', authController.getUsers)