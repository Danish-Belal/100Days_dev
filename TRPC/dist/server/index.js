"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const trpc_1 = require("./trpc");
const zod_1 = __importDefault(require("zod"));
const standalone_1 = require("@trpc/server/adapters/standalone");
var jwt = require('jsonwebtoken');
const cors = require('cors');
const db_1 = require("./db");
const user_1 = require("./routes/user");
const todo_1 = require("./routes/todo");
const mongodbUrl = process.env.MONGODB_URL || '';
const secret = process.env.SECRET || '';
console.log(mongodbUrl);
mongoose_1.default.connect(mongodbUrl)
    .then(() => {
    console.log("MongoDB Connected");
})
    .catch((error) => {
    console.error("MongoDB Connection Error:", error);
});
const todoInputType = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string()
});
const appRouter = (0, trpc_1.router)({
    user: user_1.userRouter,
    todo: todo_1.todoRouter,
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    middleware: cors(),
    createContext(otps) {
        let authHeader = otps.req.headers['authorization'];
        console.log("AuthHeader", authHeader);
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(token);
            return new Promise((resolve) => {
                jwt.verify(token, secret, (err, user) => {
                    if (user) {
                        resolve({ userId: user.userId, db: { Todo: db_1.Todo, User: db_1.User } });
                    }
                    else {
                        resolve({ db: { Todo: db_1.Todo, User: db_1.User } });
                    }
                });
            });
        }
        return {
            db: { Todo: db_1.Todo, User: db_1.User }
        };
    }
});
server.listen(3000);
console.log("server staertd on 3000");
