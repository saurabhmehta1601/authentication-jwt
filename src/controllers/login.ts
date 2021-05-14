import {Request,Response} from "express"
import { User,IUser } from "../models/User"
import { compare } from "bcryptjs"

export default async (req :Request,res : Response) => {
    const {email , password } =req.body

    if(!email || !password) 
        res.status(400).json({ success:false,message:"Please enter credentials" })
    
    const user : IUser | null = await User.findOne({email}).exec()

    if(!user){
        res.status(404).json({ success:false,message:"User with this email address doesn't exists" })
    }else{
        const valid : boolean = await compare(password,user.password )
        
        if(valid){
            const accessToken = user.getAccessToken()
            const refreshToken = user.getRefreshToken()
            res.status(200).json({ 
                success:true,payload:{
                    email:user.email,accessToken}}
                )
            
        }else{
            res.status(400).json({success:false,message:"Incorrect password "})
        }
    }


    console.log(user)
    res.send("okay")
}