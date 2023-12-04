import {model, Schema, Model} from "mongoose";

// Интерфейс для представления структуры данных роли
interface IRole {
    value: string;
}
// Интерфейс для представления документа роли (с учетом Mongoose)
interface IRoleDocument extends IRole, Document {}

// Интерфейс для представления модели роли (с учетом Mongoose)
interface IRoleModel extends Model<IRoleDocument> {}


const Role: Schema<IRoleDocument, IRoleModel> = new Schema ({
    value: {type: String, unique: true, default: 'USER'}
})

export default model('Role', Role);