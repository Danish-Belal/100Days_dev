"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@trpc/client");
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = (0, client_1.createTRPCClient)({
    links: [
        (0, client_1.httpBatchLink)({
            url: 'http://localhost:3000',
            headers() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        authorization: "Bearer 1"
                    };
                });
            },
        }),
    ],
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const todo = yield trpc.todo.createTodo.mutate({ description: "adsa", title: "asd" });
        console.log(todo);
    });
}
main();
