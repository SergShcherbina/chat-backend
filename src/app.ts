import express from 'express'
import http from 'http'
import {Server, Socket} from "socket.io"
import {authRouter} from './routers/authRouter';
import {rootRouter} from './routers/rootRouter';
import {registerTodoHandlers} from './socket';
import cors from 'cors'
import dotenv from 'dotenv'
import * as mongoose from "mongoose";

dotenv.config() //для чтения переменных окружения

const app = express()
app.use(cors());
app.use(express.json()); //express.json() ставим перед route, иначе отсутствует body
app.use('/auth', authRouter);
app.use('/', rootRouter);

export const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true,
    },
});

const socketConnection = (socket: Socket) => {
    registerTodoHandlers(io, socket)
};
io.on('connection', socketConnection);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await mongoose
            .connect('mongodb://127.0.0.1:27017/chatDB' || process.env.DB_CONN)
        httpServer.listen(PORT, () => {
            console.log('listening on :' + PORT);
        });
    } catch (err) {
        console.log('App.ts:',  err)
    }
}
void start();