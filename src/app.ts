import express, { Request, Response } from 'express'
import http from 'http'
import { Server, Socket } from "socket.io"
import { routes } from './route';
import { registerTodoHandlers } from './socket';


const app = express()
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

app.use(routes);
const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
    console.log('listening on :' + port);
});