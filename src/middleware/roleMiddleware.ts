import {NextFunction, Request, Response} from 'express'
import jwt from "jsonwebtoken";
import {secret} from "../config";
import {EnumRole} from "../enums/enumRole";

interface TokenPayload {
    roles: [EnumRole.USER | EnumRole.ADMIN];
}

export const roleMiddleware = (arrRole: [EnumRole.USER | EnumRole.ADMIN]) => (req: Request, res: Response, next: NextFunction)=> {
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const {roles} = jwt.verify(token, secret) as TokenPayload
        let hasRoles = false;
        roles.forEach(role => {
            if (arrRole.includes(role)){
                hasRoles = true
            }
        })
        if(!hasRoles) {
            return res.status(403).json({message: 'У Вас нет прав доступа'})
        }
        next()
    } catch(e){
        console.log('roleMiddleware:', e)
        return res.status(403).json({message: 'Пользователь не авторизован'})
    }
}