import { Router} from "express"
import register from "../controllers/register"
import login from "../controllers/login"

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)


export default router

