import Home from './Components/Home'
import './App.css'
import Signup from './Components/signup'
import Login from './Components/Login'
import CreateCourse from './Components/CreateCourse'
import ShowCourse from './Components/ShowCourse'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    < div style={{width: "100wh",
    height: "100vh",
    backgroundColor: "#eeeeee"}}>
    <Router >
      <Home />
      <Routes>
        <Route path={'/login'} element={<Login/>}></Route>
        <Route path={'/signup'} element={<Signup/>}></Route>
        <Route path={'/Createcourses'} element={<CreateCourse/>}></Route>
        <Route path={'/Allcources'} element = {<ShowCourse/>} ></Route>
      </Routes>
    </Router>
    
    </div>
  )
}

export default App
