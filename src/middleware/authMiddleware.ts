import {Response} from "express";
import {secret} from '../config'
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: Response, next: any) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        req.user = jwt.verify(token, secret);
        next();
    } catch (e) {
        console.log('authMiddleware:', e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
}