import {model, Schema, Model} from "mongoose";

export type IRoom = {
    _id: string;
    roomName: string;
    users: string[];
};

type IRoomDocument = IRoom & Document;

type IRoomModel = Model<IRoomDocument>;

const RoomSchema: Schema<IRoomDocument, IRoomModel> = new Schema({
    roomName: {type: String, unique: true, required: true},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}]  // Ссылка на модель User
});

export const Room = model('Room', RoomSchema);
