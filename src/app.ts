import express from 'express'
import http from 'http'
import {Server, Socket} from "socket.io"
import {authRouter} from './routers/authRouter';
import {rootRouter} from './routers/rootRouter';
import {registerTodoHandlers} from './socket';
import * as mongoose from "mongoose";


const app = express()
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
            .connect(`mongodb+srv://1990sergik27:xrFmPzXliaJpTAYn@auth-chat.bhpa9na.mongodb.net/?retryWrites=true&w=majority`)
        httpServer.listen(PORT, () => {
            console.log('listening on :' + PORT);
        });
    } catch (err) {
        console.log(err)
    }
}
start();