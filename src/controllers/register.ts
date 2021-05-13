import {Request,Response} from "express"
import { User, IUser } from "../models/User"
import bcrypt from "bcryptjs"


export default async (req: Request,res : Response)=>{
    const {name,email,password } =req.body  
 
    try{
        const user : IUser|null  = await User.findOne({email})
        
        if(user){
            res.status(403).json({
                success:false,
                message:"User with entered account already exists "
            })
        }
        const hashedPassword : string = await bcrypt.hash(password,12) 
        
        await User.create({
            name,email,password : hashedPassword
        })
 
        res.status(201).json({success:true,message:"user account created"})
    }catch(err){
     res.status(500).json({
         success:false,
         message:err.message
     })
    }
 }