
import { useEffect, useState } from 'react';
import React from 'react';
import './App.css'

function useTodo(){
  const[ todos , setTodos] = useState([]);

  React.useEffect( () => {
    fetch("http://localhost:3000/todos", {
      method: 'GET'
    }).then((respons) => {
      respons.json().then((data) => {
        console.log(data);
        setTodos(data);
      })
    });

    setInterval(()=>{
      fetch("http://localhost:3000/todos", {
      method: 'GET'
    }).then((respons) => {
      respons.json().then((data) => {
        console.log(data);
        setTodos(data);
      })
    });

    },1000)
  }, [])
  return todos
}
function App() {
  const todos = useTodo();

  return (
    <div>
      
       {/* {JSON.stringify(todos)} */}
       {todos.map((todo) =>{
          return (
          <Todo  id = {todo.id} title = {todo.title} description = {todo.description}/>
          )
        })}  
    </div>
  )
  
}

function Todo(prpos){
  return <div>
    
    {prpos.title} {" "}
    {prpos.description} 
    <button >Delete</button>

  </div>
}

export default App
