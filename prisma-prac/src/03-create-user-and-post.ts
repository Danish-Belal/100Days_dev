import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

async function main(){
     const userPost  =await prisma.user.create({
          data: {
               email: "Tabrej@gmail.com",
               name : "Tabrej Alam",
               posts : {
                    create : [
                         {title: "Drink Water"},
                         {title : "Eat Healthy food"}
                    ]
               }
          }
     })
     console.log(userPost);
     
}

main()
.then(async()=>{
     console.log("Done");
     await prisma.$disconnect();
     
})
.catch(async(e)=>{
     console.log(e);
     await prisma.$disconnect();
     process.exit(1);
     
})