import {Request, Response, Router} from "express"
import {Document} from "mongoose"

interface IUser extends Document {
    name:string,
    email :string,
    password : string,
}


const router = Router()
router.route("/register").post( async (req: Request,res : Response)=>{
   const {email,password } =req.body 

   try{
    //    const user : IUser  =await 
   }catch(err){
    console.info("user registration failed ", err)
   }
})



export default router

