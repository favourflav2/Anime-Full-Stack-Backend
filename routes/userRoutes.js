import {Router} from "express"
import { getUserSavedAnime, googleSign_Up, like_Anime, log_In, sign_Up } from "../controller/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"
const router = Router()


//get
router.get('/savedArr',authMiddleware,getUserSavedAnime)

router.post('/signup',sign_Up)
router.post('/login',log_In)
router.post('/googleSignup',googleSign_Up)

//put
router.put('/like',authMiddleware,like_Anime)

export default router