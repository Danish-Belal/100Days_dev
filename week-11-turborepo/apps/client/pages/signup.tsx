import { Signup } from "@repo/ui/signup";
import axios from "axios";


export default function SigninPage(){
     return <div>
          <Signup onClick={async (email,password)=>{
               const response = await axios.post("/api/signup", {
                    email, 
                    password
                });
                localStorage.setItem("token", response.data.token);
            }} />
     </div>
}