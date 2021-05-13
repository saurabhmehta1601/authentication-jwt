import { Schema, model, Document, Model } from "mongoose";
import { hash } from "bcryptjs";
import {sign} from "jsonwebtoken"
interface IUser extends Document {
    name : string;
    email : string;
    password : string;
}

const UserSchema : Schema= new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre<IUser>("save", async function () {
    if(this.isModified("password")){
        this.password = await hash(this.password,12)
    }
});

// UserSchema.methods.getAccessToken = () =>{
//     return  sign({id: this?._id || ""},process.env.ACCESS_TOKEN_SECRET || "",{
//         expiresIn : "1d"
//     })
// }


export const User : Model<IUser> = model("User", UserSchema);
