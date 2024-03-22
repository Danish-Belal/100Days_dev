import { publicProcedure, router } from "../trpc";
import { isLoggedIn } from "../middleware/user";
import {z} from 'zod'

const todoInput = z.object({
     title: z.string(),
     description: z.string(),
     
})
export const todoRouter = router({
     createTodo: publicProcedure
          .input(todoInput)
          .use(isLoggedIn)
          .mutation(async (otps)=>{
               let title = otps.input.title;
               let description = otps.input.description;

               const newTodo = new otps.ctx.db.Todo({title, description, done:false, userId:otps.ctx.userId})
               let response =await  newTodo.save();

               return{
                    id:response.id
               }
          }),
     
     todoGet: publicProcedure
     .output(z.array(z.object({
          title: z.string(),
          description: z.string(),
          done: z.boolean()
      })))
      .use(isLoggedIn)
      .query(async (otps)=>{
          let todos = await otps.ctx.db.Todo.find({
               userId: otps.ctx.userId
          })
          return todos.map(x=>({
               title: x.title || "",
               description: x.description || "",
               done: x.done || false
          }))

      })

     

})