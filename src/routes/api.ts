import { Router} from "express"
import register from "../controllers/register"
import login from "../controllers/login"
import logout from "../controllers/logout"
import getAccessToken from "../controllers/getAccessToken"

const router = Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/refresh_token").post(getAccessToken)

export default router

