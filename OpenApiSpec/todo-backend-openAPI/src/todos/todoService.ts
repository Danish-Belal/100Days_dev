import { log } from "console";
import { Todo } from "./todo";

export type TodoCreationParams = Pick<Todo , 'title' | 'description' >

export class TodoService{
     public get(todoId: string):Todo {
          return{
               id: todoId,
               description: "Drink Water",
               title: "Healthy life",
               done:false
          }
     }

     public create(todoCreationParams: TodoCreationParams){
          console.log("inside Creation")
          return{
               id: "1",
               title: "HealthyLifestyle",
               description: "Goto gym",
               done: false
          }
     }
}