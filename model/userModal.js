import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:false
    },
    googleId:{
        type: String,
        required: false
    },
    savedAnimes:{
        type:[],
        default:[]
    }
},{timestamps :true})

const User = mongoose.model("User",userSchema)

export default User