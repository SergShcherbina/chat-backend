import express, {Request, Response} from 'express'
import http from 'http'
import { Server } from "socket.io"
import { v4 as uuidv4 } from 'uuid';

const app = express()
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true,
    },
});

const port = process.env.PORT || 3000

type MessageType = {
    message: string;
    id: string;
    user: { id: string, name: string },
}
const messages: MessageType[] = [
    {message: 'Hi', id: uuidv4(), user: {id: uuidv4(), name: 'Alex'}},
    {message: 'Hello Alex', id: uuidv4(), user: {id: uuidv4(), name: 'Jon'}},
]

const usersState = new Map()

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Server!!!</h1>');
});

io.on('connection', (socket) => {
    usersState.set(socket, {id: uuidv4(), name: 'anonym'})

    socket.on('name-send', (userName: string) => {
        if(userName.trim().length < 2) return
        usersState.set(socket, {id: uuidv4(), name: userName})
    })

    socket.on('client-message-send', (message: string, errorCallBack) => {
        if(message.length > 10) return errorCallBack('Maximum message length 10 characters')
        
        if(message.trim().length < 2) return
        const messageItem = {
            message: message, 
            id: uuidv4(), 
            user: usersState.get(socket)
        }
        messages.push( messageItem )
        io.emit('new-message-send', messageItem)

        return null
    });

    socket.emit('init-messages-published', messages);

    socket.on('writes-message', ()=> {
        socket.broadcast.emit('user-writes-message', usersState.get(socket))
    });

    socket.on('disconnect', ()=> {
        usersState.delete(socket)
    })
});

httpServer.listen(port, () => {
    console.log('listening on *:' + port);
});