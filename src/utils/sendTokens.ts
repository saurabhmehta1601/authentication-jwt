import {Request,Response} from "express"



export const sendRefreshToken= (res: Response, token : string) =>{ 
    res.cookie('refresh_token',token,{
        httpOnly:true,
        path:"/refresh_token"
    })
}