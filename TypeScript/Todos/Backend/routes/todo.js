const express = require('express')
const {authenticateJWT , SECRET} = require('../middelware/index')
const {Todo} = require('../db');
const router = express.Router();

router.post('/todos' , authenticateJWT , (req, res)=>{
     const {title , description} = req.body;
     const done = false;
     const userId = req.userId;

     const newTodo = new Todo({title , description , done , userId})

     newTodo.save()
     .then((savedTodod)=>{
          res.status(201).json(savedTodod)
     })
     .catch((err)=>{
          res.status(500).json({
               error : "Filed to Create a todo"
          });
     });

});

router.get('/todos' , authenticateJWT , async(req, res)=>{
     const userId = req.userId;

     try{
          const todos =await Todo.find({userId})
          return res.status(200).json({
               todo : todos
          });
          

     }catch(err){
          return res.status(500).json({
               error : "Failed to retrive Todos"
          });
     }
     
})

router.patch('todos/:todoId/done', authenticateJWT , async(req,res)=>{
     try{
          const {todoId} = req.params;
          const userId = req.userId

          const updateTodo = await Todo.findByIdAndUpdate(
               { _id: todoId, userId},
               { done : true},
               {new : true}
          );

          if(!updateTodo){
               return res.status(400).json({
                    error: "Todo not found"
               })
          }
          res.json(updateTodo)

     }catch(error){
          console.log(error);
          res.status(500).json({
               error: "Internal server error"
          })
     }
})
module.exports = router
