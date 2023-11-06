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
                    return res.sendStatus(400).json({massage: err})
               }
               req.user = user;
               next();
          });

     }else{
          res.sendStatus(401);
     }
}

//connections 
mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   

// Routes.
app.get('/' , (req,res) =>{
     res.status(200).json({
          massage:"Get request"
     });
});

app.post('/admin/signup', async(req,res)=>{
     
     
     try{
          const {username , password} = req.body;
          // return res.json({massage : password});
          const existAdmin = await Admin.findOne({username});
          
          if(existAdmin){
               return res.status(401).json({
                    massage : "Admin Already exits"
               })
          }
          const newObj = new Admin({username , password});
          await newObj.save();

          const  token = jwt.sign({username , role : 'admin'} , secret , {expiresIn : '1h'});
          res.json({
               "massage" : "Admin created succesfully",
               token
          });
     }catch(error){
          res.status(500).json({
               massage: "Internal server error"
          });
     }
});

app.post('/admin/login', async (req,res)=> {
     try{
          const {username , password} = req.body;
          const admin = await Admin.findOne({username , password});
          if(admin){
               const token = jwt.sign({username , role:'admin'} , secret , {expiresIn : '1hr'});
               return res.status(200).json({
                    massage : "Admin Login succesfull",
                    token : token

               });
          }
          return res.status(401).json({
               massage : "Admin do not exist"
          })

     }catch(error){
          res.status(500).json({
               massage : "Internal server error"
          });
     }
});

app.post('/admin/courses' , authenticateJwt , async (req,res) => {
     try{
          const newCourse =  new Course(req.body)
          await newCourse.save();
          return res.status(201).json({
               massage : "New Course added succesfully",
               course : newCourse
          });
     }catch(error){
          res.status(500).json({
               massage: "some error occured"
          });
     }
});

app.put('/admin/course/:courseId' , authenticateJwt , async (req,res)=>{
     try{
          const course = await Course.findByIdAndUpdate(req.params.courseId , req.body , {new : true});
          if(course){
               res.status(201).json({
                    massage : "Course Updated successfully"
               });
          }else{
               res.status(401).json({
                    massage : "Course Not Found"
               });
          }

     }catch(error){
          return res.status(500).json({
               massage : "Internal server fail"
          });

     }
})

app.get('/admin/courses' , authenticateJwt , async (req,res)=>{
     try{
          const courses = await Course.find({});
          if(courses.length > 0){
               res.json({
                    courses
               })
          }else{
               res.status(401).json({
                    massage : "No course found"
               })
          }

     }catch(error){
          return res.status(500).json({
               massage : "Internal server fail"
          });
     }
})


// User
// User routes
app.post('/users/signup', async (req, res) => {
     const { username, password } = req.body;
     const user = await User.findOne({ username });
     if (user) {
       res.status(403).json({ message: 'User already exists' });
     } else {
       const newUser = new User({ username, password });
       await newUser.save();
       const token = jwt.sign({ username, role: 'user' }, secret , { expiresIn: '1h' });
       res.json({ message: 'User created successfully', token });
     }
   });
   
   app.post('/users/login', async (req, res) => {
     const { username, password } = req.body;
     const user = await User.findOne({ username, password });
     if (user) {
       const token = jwt.sign({ username, role: 'user' }, secret, { expiresIn: '1h' });
       res.json({ message: 'Logged in successfully', token });
     } else {
       res.status(403).json({ message: 'Invalid username or password' });
     }
   });


   app.get('/users/courses', authenticateJwt, async (req, res) => {
     const courses = await Course.find({published: true});
     res.json({ courses });
   });

   app.post('/user/cources/:courseId' , authenticateJwt , async (req,res) =>{
     const course = await Course.findById(req.params.courseId);
     if(course){
          const user = await User.findOne({username : req.body.username});
          if(user){
               user.purchasedCourse.push(course);
               await user.save();
               return res.status(201).json({
                    massage : "Course is purchased by user"
               });
          
          }else{
               return res.status(401).json({
                    massage : "User not found"
               })
          }

     }else{
          return res.status(403).json({
               massage : `Couse with id {courseId} not found`
          });
     }
   });

   app.get('/users/purchasedCourses', authenticateJwt, async (req, res) => {
     const user = await User.findOne({ username: req.body.username }).populate('purchasedCourse');
     if (user) {
       res.json({ purchasedCourses: user.purchasedCourse || [] });
     } else {
       res.status(403).json({ message: 'User not found' });
     }
   });

app.listen(3001 , ()=>{
     console.log("Server is listning at port 3001");
})