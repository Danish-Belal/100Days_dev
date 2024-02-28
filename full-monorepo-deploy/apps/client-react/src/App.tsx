
import { UserInputType } from '@repo/common'

function App() {


  return (
    <>
      Hello
      <button onClick={()=>{
        let userDetails : UserInputType = {
          email : "123@gmail.com",
          password: "12344"
        }
      }} >Click me </button>
        
    </>
  )
}

export default App
