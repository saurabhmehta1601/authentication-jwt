import { Schema, model, Document, Model } from "mongoose";
import { hash } from "bcryptjs";
import {sign} from "jsonwebtoken"

export interface IUser extends Document {
    name : string;
    email : string;
    password : string;
    getAccessToken : () => string ;
    getRefreshToken : () => string ;
}

const UserSchema : Schema= new Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true, 
    trim:true
  },
  password: {
    type: String,
    required: true,
    trim:true
  }
});

UserSchema.pre<IUser>("save", async function () {
    if(this.isModified("password")){
        this.password = await hash(this.password,12)
    }
});

UserSchema.methods.getAccessToken = function() : string{
  const token = sign({id: this.id},process.env.ACCESS_TOKEN_SECRET || "",{expiresIn:"15m"})
  
  return token 
}

UserSchema.methods.getRefreshToken = function() : string {
  const token = sign({id: this.id},process.env.REFRESH_TOKEN_SECRET || "",{expiresIn:"6h"})
  
  return token 
}


export const User : Model<IUser> = model("User", UserSchema);
