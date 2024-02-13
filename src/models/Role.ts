import {model, Schema, Model} from "mongoose";
import {EnumRole} from "../enums/enumRole";

// Интерфейс для представления структуры данных роли
export interface IRole {
    value: string;
}
// Интерфейс для представления документа роли (с учетом Mongoose)
interface IRoleDocument extends IRole, Document {}

// Интерфейс для представления модели роли (с учетом Mongoose)
interface IRoleModel extends Model<IRoleDocument> {}


const Role: Schema<IRoleDocument, IRoleModel> = new Schema ({
    value: {type: String, unique: true, default: EnumRole.USER}
})

export default model('Role', Role);