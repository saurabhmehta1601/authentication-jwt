import {Request,Response} from "express"
import { User } from "../models/User"


interface registerArgs {
    name:string,
    email:string,
    password:string
} 

export default async (req: Request,res : Response)=>{
    const {name,email,password } : registerArgs=req.body  
 
    try{
        // finding user by primary key which is here email
        const user   = await User.findOne({email})
        
        if(user){
            res.status(409).json({
                success:false,
                message:"User with this account already exists "
            })
        }
        else{
        await User.create({
            name,email,password 
        })
        res.status(201).json({success:true,message:"user account created"})}

    }catch(err){
     res.status(500).json({
         success:false,
         message:err.message
     })
    }
 }