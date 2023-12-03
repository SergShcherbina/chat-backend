import {Schema, model, Document, Model} from 'mongoose'

export interface IUser {
    username: string;
    password: string;
    role: string[]; // Предполагается, что role - это массив строк
}
// Интерфейс для представления документа пользователя (с учетом Mongoose)
interface IUserDocument extends IUser, Document {}

// Интерфейс для представления модели пользователя (с учетом Mongoose)
interface IUserModel extends Model<IUserDocument> {}

const User: Schema<IUserDocument, IUserModel> = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: [{type: String, ref: 'Role'}]
})

export default model('User', User)