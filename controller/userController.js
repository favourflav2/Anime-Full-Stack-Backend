import User from "../model/userModal.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Jikan from "jikan4.js";
import mongoose from "mongoose";



export async function sign_Up(req,res){
    const {email,password,username} = req.body

    try{
        const alreadyUser = await User.findOne({email})

        if(alreadyUser){
            return res.status(404).json({msg: "User Already Exits"})
        }


        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password,salt)

        const user = await new User({email,password:hash,username})

        const token = jwt.sign({email:user.email, id:user._id},process.env.SECRET,{expiresIn: '2h'})
        
        await user.save()
       

        res.status(200).json({token,user})

    }catch(e){
        console.log(e)
        res.status(404).json({msg:e.message})
    }
}

export async function log_In(req,res){
    const {email,password} = req.body

    const user = await User.findOne({email})
    try{
        if(!user){
            return res.status(404).json({msg:"No users by that email"})
        }else{
            const token = jwt.sign({email:user.email, id:user._id},process.env.SECRET,{expiresIn: '2h'})
            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res.status(400).json({msg:"Wrong Password"})
            }else{
                return res.status(200).json({user,token})
            }
        }

    }catch(e){
        console.log(e)
        res.status(400).json({msg:e.message})
    }
}

export async function googleSign_Up(req,res){
    const {email,username} = req.body
    const token = req.body.sub

    try{
        const oldUser = await User.findOne({email})
        // If theres already a google user in database when we sign in/up we just find that email and update
        if(oldUser){
            
            //const user = {_id:oldUser._id.toString(),email,username,googleId:token}
            //const updatedOldUser = 
            let user = oldUser
            
             return res.status(200).json({user,token})
        }

        const user = await new User({email,username,googleId:token})
        await user.save()
        res.status(200).json({user,token})
    }catch(e){
        console.log(e)
        res.status(500).json({msg:e.message})
    }
}

export async function like_Anime(req,res){
    
    const {id} = req.body
    const userId = String(req.userId)
    const client = new Jikan.Client();
  
     try{
        const result = await client.anime.get(id)
        const animeId = result.id
        console.log(animeId)
        
      if(!userId){
        return res.status(404).json({msg:"You need to be logged in to an authroized user"})
      }
  
    
  
    const user = await User.findById(userId)
    //index is filtering over the likes array... if it doesnt find the match it returns -1
    const index = user.savedAnimes.findIndex((value)=> value === animeId)
    // if index equals -1 that means the user has not already liked the post
    if(index === -1){
        if(animeId !== null){
            user.savedAnimes.push(animeId)
        }
      
    }else{
      user.savedAnimes = user.savedAnimes.filter(item => item !== animeId)
    }
  
    const updatedSavedAnime = await User.findByIdAndUpdate(userId,user,{new:true})
    //console.log(updatedSavedAnime.savedAnimes)
    res.status(200).json(updatedSavedAnime.savedAnimes)
  
    }catch(e){
      console.log(e)
      res.status(500).json({msg:e.message})
    }
  }


  export async function getUserSavedAnime(req,res){
    const userId = String(req.userId)
    const client = new Jikan.Client();

    try{
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({msg:"No User by that id"})
        }

        
        async function getAnime(){
            const savedAnime = user.savedAnimes
            let arr = []
            for(const item of savedAnime){
               const data = await client.anime.get(item)
               //console.log(data)
               arr.push(data)
            }
            //const data = await client.anime.get(id)
            
            return arr
        }

         
        
        
        let result = await getAnime()
        
        //console.log(result)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.status(500).json({msg:e.message})
    }
  }