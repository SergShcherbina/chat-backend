import { Server, Socket } from 'socket.io';
import {usersController} from "./controllers/usersController";
import {roomController} from "./controllers/roomController";


export const registerTodoHandlers = (io: Server, socket: Socket) => {

    socket.on('createRoom', async ({ userName, roomName, userId }, errorCallBack) => {
        if (!roomName) return errorCallBack('Chat title cannot be empty')
        socket.join(roomName);

        try {
            const isExistsUserToRoom = await roomController.findUserToRoom(roomName, userId)

            if(!isExistsUserToRoom){
                await roomController.createRoom(roomName, userId)

                socket.emit('youJoin', {message: `Hello, ${userName} !`});
                socket.to(roomName).emit('joinUserToRoom', {message: `User ${userName} has joined` });
            }

            const countUsersToRoom: number = await roomController.getCountUsersToRoom(roomName);

            io.in(roomName).emit('join', {countUsersToRoom, activeRoom: roomName});
        }
        catch (e) {
            console.log("catch join:",  e)
        }
    });
    //
    // socket.on('client-message-send', ({ textMessage, room }, errorCallBack) => {
    //     textMessage = trimString(textMessage)
    //
    //     if (textMessage.length > 200) return errorCallBack('Maximum message length 200 characters')
    //     if (!usersState.get(socket.id)) return errorCallBack('Enter your name')
    //     if (textMessage.length <= 0) return
    //
    //     addMessage(textMessage, socket.id);
    //     io.to(room).emit('new-message-send', getMessage(textMessage, room)); //отправка всем пользователям комнаты через io
    // });
    //
    //
    // socket.on('writes', (room: string) => {
    //     socket.to(room).emit('writes', findUser(socket.id))
    // });

    socket.on('disconnect', () => {
        console.log('disconnect socket rooms:', socket.rooms)
        // usersState.delete(socket.id)
        // messages.filter(el => el.user.id !== socket.id)
    });
}