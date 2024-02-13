import {Request, Response} from 'express';
import User, {IUser} from '../models/User';
import Role from '../models/Role';
import bcrypt from 'bcryptjs';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import {secret} from "../config";
import {EnumRole} from "../enums/enumRole";

const generateAccessToken = (id: string, roles: string[]): string => {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class AuthControllerClass {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req) //отлавливаем ошибки валидации
            if (errors.isEmpty()) {
                const {username, password}: IUser = await req.body;
                const candidate: IUser | null = await User.findOne({username})
                if (candidate) {
                    return res.status(400).json({errors: [`Пользователь с именем ${username} существует`]})
                }
                const hashPassword = bcrypt.hashSync(password, 7);
                const userRole = await Role.findOne({value: EnumRole.USER})
                const user = new User({username, password: hashPassword, role: userRole && [userRole.value]})
                await user.save()
                return res.json({message: 'Пользователь успешно зарегистрирован'})
            }
            res.status(400).json({errors: errors.array().map(e => e.msg)})
        } catch (e) {
            console.log('authControllerClass.registration:', e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req: Request, res: Response) {
        try {
            const {username, password}: IUser = req.body;
            const user: IUser | null = await User.findOne({username})
            if (!user) {
                return res.status(400).json({errors: [`Имя пользователя ${username} не найдено`]})
            }
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (!isValidPassword) {
                return res.status(400).json({errors: [`Неверный пароль`]})
            }
            //генерируем jwt web token
            const token = generateAccessToken(user._id, user.role)
            return res.json({token, username})
        } catch (e) {
            console.log('authControllerClass.login:', e)
            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            //регистрация ролей в mangoose
            // const userRole = new Role()
            // const adminRole = new Role({value: 'ADMIN'})
            // await userRole.save()
            // await adminRole.save()

            const users: IUser[] = await User.find()
            res.json(users)
        } catch (e) {
            console.log('authControllerClass.users:', e)
        }
    }

    async me(req: Request, res: Response) {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                return res.status(401).json({message: "Пользователь не авторизован"})
            }
            const {id} = jwt.verify(token, secret) as {id: string}
            const user: IUser | null = await User.findById({_id: id})
            res.json({message: "You are logged in", userName:  user?.username, userId: user?._id})
        } catch (e) {
            console.log('authControllerClass.users:', e)
        }
    }

}

export const authController = new AuthControllerClass()