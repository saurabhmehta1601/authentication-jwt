import { Request,Response } from "express"
import { User,IUser } from "../models/User"
import { compare } from "bcryptjs"
import { sendRefreshToken } from "../utils/sendTokens"

export default async (req : Request ,res : Response) => {
    const {email , password } =req.body

    if(!email || !password) 
        return res.status(400).json({ success:false,message:"Please enter credentials" })
    
    try {
        const user : IUser | null = await User.findOne({email}).exec()

    if(!user){
        return res.status(404).json({ success:false,message:"User with this email address doesn't exists" })
    }else{
        const valid : boolean = await compare(password,user.password )
        
        if(valid){
            
            const accessToken = user.getAccessToken()
            const refreshToken = user.getRefreshToken()
            
            sendRefreshToken(res,refreshToken)
            return res.status(200).json({ 
                success:true,payload:{
                    email:user.email,accessToken}}
                )
            
        }else{
           return  res.status(400).json({success:false,message:"Incorrect password "})
        }
    }
    } catch (err ) {
        return res.status(500).json({success:false,message :err.message})
    }
}