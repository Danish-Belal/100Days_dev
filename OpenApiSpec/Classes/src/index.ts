
import { once } from "helpful-decorators";
 class OpenAPi {
     private timeZone : string
     constructor(timeZone:string) {
          this.timeZone = timeZone;
     }
     @once
     getMethod(){
          let time = new Date();
          console.log("Hi form getmethod")
          return time.getTime();
     }
}

const obj1 =new OpenAPi("IND");
obj1.getMethod();
obj1.getMethod();
obj1.getMethod();
obj1.getMethod();


