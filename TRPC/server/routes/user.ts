
require('dotenv').config();
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
var jwt = require('jsonwebtoken');
import { TRPCError } from "@trpc/server";

import { isLoggedIn } from "../middleware/user";

const secret = process.env.SECRET;

const signupInput = z.object({
     username: z.string(),
     password: z.string(),
})

export const userRouter = router({
     signup: publicProcedure
        .input(z.object({
            username: z.string(),
            password: z.string()
        }))
        .mutation(async (opts) => {
            let username = opts.input.username;
            let password = opts.input.password;
            let response = await opts.ctx.db.User.insertMany([{
                username,
                password
            }])
            let userId = response[0]._id;
            console.log(userId);
            
            const token: string = jwt.sign({ userId: userId }, secret, { expiresIn: '1h' });
            console.log("token done", token);
            
            return {
                token
            }
        }),
     login: publicProcedure
     .input(z.object({
          username: z.string()
     }))
     .mutation(async (otps)=>{
          let username = otps.input.username;
          console.log(username);
          
          let repsonse = await otps.ctx.db.User.find({
               username: username
          })
          if(!repsonse){
               throw new TRPCError({code: 'UNAUTHORIZED'})
          }
          console.log(otps.ctx.userId);
          
          const token = jwt.sign({userId: otps.ctx.userId}, secret, {expiresIn: '1h'});
          
          return {
               token
          }
         
     }),
     me: publicProcedure
        .use(isLoggedIn)
        .output(z.object({
            username: z.string()
        }))
        .query(async (opts) => {
            let response = await opts.ctx.db.User.findById(opts.ctx.userId);
            if (!response) {
                // shouldn't happen
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            return {
                username: response.username || "NOTDEFINED",
            }
        }),

     
})