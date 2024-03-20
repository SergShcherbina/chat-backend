import {Schema, model, Document, Model} from 'mongoose'

export type IUser = {
    _id: string;
    username: string;
    password: string;
    role: string[];
    rooms: string[]
}

type IUserDocument = IUser & Document

type IUserModel =  Model<IUserDocument>

const User: Schema<IUserDocument, IUserModel> = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: [{type: String, ref: 'Role'}],
    rooms: [{type: String, ref: "Room"}]
})

export default model('User', User)