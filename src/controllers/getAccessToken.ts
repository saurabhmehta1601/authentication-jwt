// get an accessToken using refresh token 

import { sendRefreshToken } from "../utils/sendTokens"
import {Request, Response} from "express"
import { verify } from "jsonwebtoken"
import { User,IUser } from "../models/User"

export default async (req:Request,res:Response) =>{

let payload : any = {accessToken : ""} 
const token = req.cookies.refresh_token

if (!token) return res.json({success:false,payload});

try{
    payload  = verify(token,process.env.REFRESH_TOKEN_SECRET || "")

    const user = await User.findOne({id: payload.id})
    if(!user) return res.json({success:false,payload :{accessToken : ""}})

    if(user.refreshToken !== token){ 
        return res.json({success:false,payload:{accessToken : ""}})
    }

    user.refreshToken  = user.getRefreshToken()
    const accessToken  = user.getAccessToken()
    sendRefreshToken( res,user.refreshToken )

    return res.json({success:true,
        payload :{accessToken}
    })

}catch(err){
    return res.json({success:false,
    payload})
}
}