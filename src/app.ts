import express, {Request, Response} from 'express'
import http from 'http'
import { Server } from "socket.io"
import { v4 as uuidv4 } from 'uuid';

const app = express()
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    },
});

const port = process.env.PORT || 3000

const messages = [
    {message: 'Hi', id: uuidv4(), user: {id: uuidv4(), name: 'Alex'}},
    {message: 'Hello Alex', id: uuidv4(), user: {id: uuidv4(), name: 'Jon'}},
]

app.get('/', (req: Request, res: Response) => {
    res.send('Server!');
});

io.on('connection', (socket) => {

    socket.on('client-message-send', (message: string) => {
        let messageItem = {
            message: message, 
            id: uuidv4(), 
            user: {id: uuidv4(), name: uuidv4() }
        }
        messages.push( messageItem )

        io.emit('new-message-send', messageItem)
    });

    socket.emit('init-messages-published', messages)
});

httpServer.listen(port, () => {
    console.log('listening on *:' + port);
});