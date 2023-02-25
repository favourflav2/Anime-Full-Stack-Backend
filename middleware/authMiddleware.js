import jwt from 'jsonwebtoken'
import User from '../model/userModal.js'


export async function authMiddleware(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1]
        //console.log(token)

        const notGoogleToken = token.length > 35
        let decodedData

        if(token && notGoogleToken){
            decodedData = jwt.verify(token,process.env.SECRET)
//             decodedData == 
//             {email: 'fa@gmail.com',
//             id: '63f88f8763a3843de2937114',
//             iat: 1677234055,
//             exp: 1677241255
// }
            req.userId = decodedData?.id
        }else{
            const user = await User.findOne({googleId:token})
            req.userId = user._id
        }
        next()
    }catch(e){
        console.log(e.message)
        res.status(500).json({msg:"You need to be logged in"})
    }
}

//'Bearer 117936716514586046767' google token

// 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNodWt3YWdvbjFAZ21haWwuY29tIiwiaWQiOiI2M2Y4MTIzOTRiZmQ4Nzk4M2M3ZjQwN2QiLCJpYXQiOjE2NzcyMzM1OTUsImV4cCI6MTY3NzI0MDc5NX0.jiRcbPVGZtX0PreXvcHZaK8baXGXUFtSTgEzx97UCzo', jwt token