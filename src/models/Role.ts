import {model, Schema, Model} from "mongoose";
import {EnumRole} from "../enums/enumRole";

export interface IRole {
    value: "USER" | "ADMIN";
}

interface IRoleDocument extends IRole, Document {}

interface IRoleModel extends Model<IRoleDocument> {}

const Role: Schema<IRoleDocument, IRoleModel> = new Schema ({
    value: {type: String, unique: true, default: EnumRole.USER}
})

export default model('Role', Role);