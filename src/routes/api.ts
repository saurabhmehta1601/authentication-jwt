import {Request, Response, Router} from "express"

import {Document} from "mongoose"

interface IUser extends Document {

}


const router = Router()
router.route("/register").post( async (req: Request,res : Response)=>{
   const {email,password } =req.body 
    
   try{
   }catch(err){
    console.info("user registration failed ", err)
   }
})



export default router

