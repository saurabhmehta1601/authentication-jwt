import { Schema, model, Document, Model } from "mongoose";
import { hash } from "bcryptjs";

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
    // match: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre<IUser>("save", async function (next) {
    if(this.isModified("password")){
        this.password = await hash(this.password,12)
    }
    next()
});

export const User : Model<IUser> = model("User", UserSchema);
