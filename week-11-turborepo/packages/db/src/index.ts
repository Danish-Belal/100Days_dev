import mongoose from "mongoose"

// Import all code of authentication
const userSchema = new mongoose.Schema({
     email : {type : String},
     password : String,
     purchasedCourse: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]

});

const adminSchema = new mongoose.Schema({
     email : String,
     password : String
});

const courseSchema = new mongoose.Schema({
     title: String,
     description: String,
     price : Number,
     imageLink : String,
     published : Boolean
});

export const Admin = mongoose.model('Admin', adminSchema);
export const User = mongoose.model('User' , userSchema);
export const Course = mongoose.model('Course', courseSchema)
