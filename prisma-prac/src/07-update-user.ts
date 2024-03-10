import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['info', 'query']})

async function main(){
     const userUpdate = await prisma.user.update({
          where:{
               id:1
          },
          data:{
               name: "XOXOX"
          }
     })
     console.log(userUpdate);
     
}

main()
.then(async()=>{
     console.log("Data Updation done");
     await prisma.$disconnect()
})
.catch(async(e)=>{
     console.log(e);
     await prisma.$disconnect();
     process.exit(1)
     
})