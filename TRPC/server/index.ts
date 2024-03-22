import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { publicProcedure, router } from "./trpc";
import z, { string } from 'zod'
import { createHTTPServer } from '@trpc/server/adapters/standalone';

var jwt = require('jsonwebtoken');
const  cors =  require('cors');
import {User, Todo} from './db'
import { userRouter} from "./routes/user";
import { todoRouter} from "./routes/todo";

const mongodbUrl = process.env.MONGODB_URL || '';
const secret = process.env.SECRET || '';

console.log(mongodbUrl);

mongoose.connect(mongodbUrl)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });


const todoInputType = z.object({
     title: z.string(),
     description: z.string()
})
const appRouter = router({
     user: userRouter,
     todo: todoRouter,
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
     router: appRouter,
     middleware: cors(), 
     createContext(otps){
          let authHeader = otps.req.headers['authorization']
          console.log("AuthHeader", authHeader);
          
          if(authHeader){
               const token = authHeader.split(' ')[1]
               console.log(token);
               

               return new Promise<{ db: { Todo: typeof Todo; User: typeof User }; userId?: string }>((resolve) => {
                    jwt.verify(token, secret, (err: any, user: any) => {
                        if (user) {
                            resolve({ userId: user.userId as string, db: { Todo, User } });
                        } else {
                            resolve({ db: { Todo, User } });
                        }
                    });
                });
                
               
          }
          return{
               db:{Todo,User}
          }
     }

});

server.listen(3000);
console.log("server staertd on 3000");

