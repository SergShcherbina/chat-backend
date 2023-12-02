import {Request, Response} from "express";

export const rootController = (req: Request, res: Response)=> {
    try{
        res.send("rootRouter get '/' ")
    } catch (e) {
        console.log('rootController:', e)
    }
}