import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import animeRoutes from './routes/animeRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

// Middleware
dotenv.config()
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use(morgan("dev"))

const port = process.env.PORT || 5001

// Mongoose
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`Listening on port ${port}`)
    })
}).catch(e=>{
    console.log(e)
})
app.get('/',(req,res)=>{
    res.send("hello")
})


app.use("/anime",animeRoutes)
app.use('/auth',userRoutes)