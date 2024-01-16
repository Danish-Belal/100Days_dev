
import jwt from 'jsonwebtoken'
import express from 'express'
import {authenticateJWT , SECRET} from '../middelware/';
import { User }  from "../db";
const route = express.Router();
import {z} from 'zod'

const signupInput = z.object({
     username : z.string().min(1).max(15),
     password : z.string().min(1).max(15),
});


route.post('/signup' , async(req,res) =>{

    const parseInput = signupInput.safeParse(req.body);
    if(!parseInput.success){
      res.status(411).json({
          error: parseInput.error,
     })
     return;
    }
    const username = parseInput.data.username;
    const password = parseInput.data.password;
     // const {username, password} = req.body
     const user = await User.findOne({username})
     if(user){
          return res.status(402).json({
               massage : "User already exist"
          })
     }else{
          const newUser= new User({username , password});
          await newUser.save();
          const token = jwt.sign({id: newUser._id} , SECRET, {expiresIn: '1h'});
          res.json({
               massage: "User Created succefully", token
          });
     }
});

route.post('/login', async(req,res) =>{
     const {username, password} = req.body;
     const user = await User.findOne({username, password});
     if(!user){
          return res.status(403).json({
               massage: "User does not exist"
          })
     }else{
          const token = jwt.sign({id: user._id ,} , SECRET , {expiresIn: '1h'});
          return res.status(200).json({
               massage: "User logged in", token
          })
     }
})

route.get('/me' ,authenticateJWT , async(req,res)=>{
     const user = await User.findOne({_id:  req.headers["userId"]});
     if(user){
          res.json({username: user.username})
     }else{
          res.status(403).json({
               massage: "Invalid User"
          })
     }
});
export default route
// module.exports = route
