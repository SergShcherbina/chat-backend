import {Request, Response} from 'express';
import User from '../models/User';
import Role from '../models/Role';
import bcrypt from 'bcryptjs';

class authControllerClass {
    async registration(req: Request, res: Response) {
        try {
            console.log(req)
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: 'Пользователь с таким исенем существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, role: userRole && [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован'})
        } catch (e) {
            console.log('authControllerClass.registration:', e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req: Request, res: Response) {
        try {

        } catch (e) {
            console.log('authControllerClass.login:', e)
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            // const userRole = new Role()
            // const adminRole = new Role({value: 'ADMIN'})
            // await userRole.save()
            // await adminRole.save()

            res.json('server good work')
        } catch (e) {
            console.log('authControllerClass.users:', e)
        }
    }

}

export const authController = new authControllerClass()