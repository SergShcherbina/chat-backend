import { Server, Socket } from 'socket.io';
import { usersState, addMessage, getMessage, countUsersRoom, addUser, messages, findUser } from './users';
import { trimString } from './utils/trimString';


export const registerTodoHandlers = (io: Server, socket: Socket) => {

    socket.on('join', ({ userName, room }) => {
        userName = trimString(userName);
        room = trimString(room);
        const isExist = findUser(socket.id)

        if (userName.length < 2 && room.length < 2) return
        addUser(socket.id, userName, room);

        socket.join(room);
        socket.emit('set-userId', socket.id);

        if (!isExist) {
            socket.emit('join', { countUsersRoom: countUsersRoom(room), message: `Hello, ${userName} !` })
            socket.to(room)
                .emit('join', { countUsersRoom: countUsersRoom(room), message: `User ${userName} has joined` });
        }
    });

    socket.on('client-message-send', ({ textMessage, room }, errorCallBack) => {
        textMessage = trimString(textMessage)

        if (textMessage.length > 200) return errorCallBack('Maximum message length 200 characters')
        if (!usersState.get(socket.id)) return errorCallBack('Enter your name')
        if (textMessage.length <= 0) return

        addMessage(textMessage, socket.id);
        io.to(room).emit('new-message-send', getMessage(textMessage, room));
    });

    // socket.emit('init-messages-published', messages);

    socket.on('writes', (room: string) => {
        socket.to(room).emit('writes', findUser(socket.id))
    });

    socket.on('disconnect', () => {
        console.log('disconnect socket rooms:', socket.rooms)
        usersState.delete(socket.id)
        messages.filter(el => el.user.id !== socket.id)
    });
}