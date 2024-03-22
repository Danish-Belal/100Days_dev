import mongoose from "mongoose";
import { z } from "zod";

const TodoScheam = new mongoose.Schema({
     title: {type: String},
     description: {type: String},
     userId: String,
     isDone: Boolean 
})

const UserSchema = new mongoose.Schema({
     username: {type: String},
     password: String
})

export const Todo = mongoose.models.Todo|| mongoose.model('Todo', TodoScheam);
export const User = mongoose.models.User|| mongoose.model('User', TodoScheam);