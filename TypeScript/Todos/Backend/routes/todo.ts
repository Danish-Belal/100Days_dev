import express from 'express'
import {authenticateJWT , SECRET} from  '../middelware/index'
import {Todo} from '../db';
const router = express.Router();
import { Request, Response} from 'express';

interface CreateTodo {
     title: string;
     description : string
}
router.post('/todos' , authenticateJWT , (req : Request, res: Response)=>{
     const input : CreateTodo =  req.body;
     const done = false;
     const userId = req.headers["userId"];

     const newTodo = new Todo({title: input.title , description: input.description , done , userId})

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
     const userId = req.headers["userId"];

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

router.patch('/todos/:todoId/done', authenticateJWT, (req, res) => {
     const { todoId } = req.params;
     const userId = req.headers["userId"];
   
     Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
       .then((updatedTodo) => {
         if (!updatedTodo) {
           return res.status(404).json({ error: 'Todo not found' });
         }
         res.json(updatedTodo);
       })
       .catch((err) => {
         res.status(500).json({ error: 'Failed to update todo' });
       });
   });
   
export default router
// module.exports = router
