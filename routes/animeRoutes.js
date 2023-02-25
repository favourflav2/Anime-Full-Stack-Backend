import {Router} from 'express'
import {  bestAnime, printSearch, topAnime, topAnimeQuery } from '../controller/animeControler.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
const router = Router()



// get
router.get('/top',topAnime)
router.get('/topQ',topAnimeQuery)
router.get('/best',bestAnime)


// post
router.post('/search',printSearch)

// put




export default router