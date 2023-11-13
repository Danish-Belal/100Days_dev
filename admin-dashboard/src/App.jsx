import Home from './Components/Home'
import './App.css'
import Signup from './Components/signup'
import Login from './Components/Login'
import CreateCourse from './Components/CreateCourse'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    < div style={{width: "100wh",
    height: "100vh",
    backgroundColor: "#eeeeee"}}>
    {/* <Login /> */}
    {/* <CreateCourse /> */}
    <Router >
      <Home />
      <Routes>
        <Route path={'/login'} element={<Login/>}></Route>
        <Route path={'/signup'} element={<Signup/>}></Route>
        <Route path={'/courses'} element={<CreateCourse/>}></Route>
      </Routes>
    </Router>
    
    </div>
  )
}

export default App
