import { v4 as uuidv4 } from 'uuid';

type MessageType = {
    message: string;
    id: string;
    user: UserType,
};
type UserType = {
    id: string, 
    name: string,
    room: string
};

export const usersState = new Map<string, UserType>();

export const findUser = (userId: string) => {
    return usersState.get(userId)
};

export const addUser = (socketId: string, userName: string, room: string) => {
    return findUser(socketId) || usersState.set(socketId, { id: socketId, name: userName, room }) 
};

export const countUsersRoom = (room: string) => {
    let countUsers = 0
    for(let user of usersState.values()){
        if(user.room === room){
            countUsers++
        }
    }
    return countUsers
};

export const messages: MessageType[] = [
    // {message: 'Hi', id: uuidv4(), user: {id: uuidv4(), name: 'Alex', room: 'second'}},
    // {message: 'Hello Alex', id: uuidv4(), user: {id: uuidv4(), name: 'Jon', room: 'first'}},
];

export const addMessage = (text: string, socketId: string) => {
    const messageItem = {
            message: text, 
            id: uuidv4(), 
            user: usersState.get(socketId) as UserType
        }
        messages.push(messageItem)
};

export const getMessage = (text: string, room: string) => {
    return messages.find(el => el.message.includes(text) && el.user.room.includes(room) )
};

export const getAllMessageRoom = (room: string) => {
    return messages.filter(el => el.user.room.includes(room) )
};


