"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
class TodoService {
    get(todoId) {
        return {
            id: todoId,
            description: "Drink Water",
            title: "Healthy life",
            done: false
        };
    }
    create(todoCreationParams) {
        console.log("inside Creation");
        return {
            id: "1",
            title: "HealthyLifestyle",
            description: "Goto gym",
            done: false
        };
    }
}
exports.TodoService = TodoService;
