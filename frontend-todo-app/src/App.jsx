
import { useState } from 'react';
import './App.css'

function App() {
  const[ todo , setTodos] = useState({
    id : 1,
    title : "Go to gym",
    description : "Gym will pump your body"
  })

  setTimeout(() => {
    setTodos({
      id : 2,
      title : "Eat food",
      description : "Eat Healthy foods"
    })   
  }, 4000);
  return (
    <>
      <h3>Hii there </h3>
      {todo.id}
      {todo.title}
      {todo.description}
      
    </>
  )
}

export default App
