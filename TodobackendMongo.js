const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(express.json());


const secret = process.env.JWT_SECRET;

// Mongoose Schema
const userSchema = new mongoose.Schema({
     username: String,
     password:String,
     purchasedCourse : [{ type : mongoose.Schema.Types.ObjectId ,  ref: ' Course'}]
});

const adminSchema = new mongoose.Schema({
     username : String,
     password : String
});

const courseSchema = new mongoose.Schema({
     title : String,
     description : String, 
     price : Number,
     imageLink : String,
     published : Boolean
})


// Define Models.

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model(' Course', courseSchema);

const authenticateJwt = (req , res , next) =>{
     const authHeader = req.headers.authorization;
     if(authHeader){
          const toekn  = authHeader.split(' ')[1];
          jwt.verify(toekn, secret , (err , user) =>{
               if(err){
                    return sendStatus(400)
               }
               req.user = user;
               next();
          });

     }else{
          res.sendStatus(401);
     }
}



mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   
app.listen(3001 , ()=>{
     console.log("Server is listning at port 3001");
})