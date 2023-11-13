import express, {Request, Response} from 'express'
import http from 'http'
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app);
const io = new Server(server);
const port = 3001

app.get('/', (req: Request, res: Response) => {
    res.send('Server!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(port, () => {
    console.log('listening on *:' + port);
});