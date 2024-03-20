import User from "../models/User";
import Room from "../models/Room";

class UsersControllerClass {

    async findUsers(userId: string) {
        return User.findOne({_id: userId})
    }

    async addNewRoomToUser(userId: string, roomId: string) {
        return  User.findByIdAndUpdate({_id: userId}, {$push: { rooms: roomId}})
    }
}
export const usersController = new UsersControllerClass()