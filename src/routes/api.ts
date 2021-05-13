import { Router} from "express"
import register from "../controllers/register"

const router = Router()

router.route("/register").post(register)



export default router

