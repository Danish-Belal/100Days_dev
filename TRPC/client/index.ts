import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';
import { User } from '../server/db';
import { router } from '../server/trpc';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
      async headers() {
        return {
          authorization: "Bearer 1"
        }
      },
    }),
  ],
});

async function main(){
     
      // let user = await trpc.user.signup
      // .mutate({
      //   username:"Dansh",
      //   password:"Danish"
      // })
      // console.log(user.token);

      // let userLogin = await trpc.user.login.mutate({username:"Danish"})
      // if(userLogin.token){
      //   console.log(userLogin.token);
      //   console.log("token Printed");
        
        
      // }else{
      //   console.log("got nothing");
        
      //  }

      // let userval = trpc.user.me.query()
      // console.log((await userval).username);

      const todo = await trpc.todo.createTodo.mutate({description: "adsa", title: "asd"});
      console.log(todo);
      

      
}
main();
