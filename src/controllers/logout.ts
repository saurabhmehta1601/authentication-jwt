import {Request,Response} from "express"

export default async (req: Request,res : Response ) =>{
    // remove refresh token from cookie  
    res.clearCookie('refreshtoken',{
        path:"/refresh_token"
    })

    res.status(200).json({success:true,payload:{
        message : "Logged out successfully"
    }})
}