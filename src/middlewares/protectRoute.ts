import {verify} from "jsonwebtoken"
import {NextFunction, Request,Response} from "express"
import {User} from "../models/User"

export const protect = async (req : Request,res : Response,next: NextFunction) =>{
  const authorization = req.headers['authorization'];
  if (!authorization) 
    return res.json({success:false,message:"You need to login first "})
  // Based on 'Bearer ksfljrewori384328289398432'
  const token = authorization.split(' ')[1];
  const decoded : any = verify(token, process.env.ACCESS_TOKEN_SECRET || "");

  try{
    const user  =await User.find({id:decoded.id}).exec();
    if(user){
        next()
    }else{
    return res.json({success:false,message:"Cannot access protected route "})
    }}
    catch(err){
    return res.json({success:false,message:"Cannot access protected route "})
  }

}