import mongoose,{Schema,Document,Model,model} from "mongoose"

export interface IUser extends Document {
    name:string,
    email :string,
    password : string,
}

const UserSchema : Schema = new Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
})

export const User : Model<IUser> = model("User",UserSchema)