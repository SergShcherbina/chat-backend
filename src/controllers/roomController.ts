import Room from "../models/Room";
import {usersController} from "./usersController";

class RoomControllerClass {
    async createRoom(roomName: string, userId: string) {
        try {
            const isExistsRoom = await Room.exists({roomName})

            if(isExistsRoom){
                const room  = await Room.findOneAndUpdate({roomName}, {$push: {users: [userId]}})
                room && await usersController.addNewRoomToUser(userId, room.id)
            } else {
                const newRoom  = await new Room({roomName, users: [userId]}).save();
                newRoom && await usersController.addNewRoomToUser(userId, newRoom.id)
            }
        } catch (e) {
            console.log("RoomControllerClass.createRoom:",  e)
        }
    }

    async getCountUsersToRoom(roomName: string) {
        const rooms = await Room.find({roomName})
        return rooms[0].users && rooms[0].users.length
    }

    async findUserToRoom(roomName: string, userId: string) {
        try {
            return !!await Room.findOne({roomName, users: userId })
        } catch (e) {
            console.log("RoomControllerClass.findRoom:",  e)
        }
    }
}
export const roomController = new RoomControllerClass()