import {model, Schema, Model} from "mongoose";

export type IRoom = {
    _id: string;
    roomName: string;
    users: string[];
    // messages: { message: string, id: string}[]
};

type IRoomDocument = IRoom & Document;

type IRoomModel = Model<IRoomDocument>;

const RoomSchema: Schema<IRoomDocument, IRoomModel> = new Schema({
    roomName: {type: String, unique: true, required: true},
    users: [{type: String, ref: 'User'}]  // Ссылка на модель User
});

export default model('Room', RoomSchema);
