import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({log: ['info', 'query']});

async function main(){
     const users = await prisma.user.findMany({})
     console.log(users);

     const user = await prisma.user.findUnique({
          where: {
               email : "Hellog@gmail"
          },
          include:{
               posts: true
          }
     })
     console.log(user);
     
     


}

main()
.then(async()=>{
     console.log("Done");
     await prisma.$disconnect();
     
})
.catch(async(e)=>{
     console.log(e);
     await prisma.$disconnect();
     process.exit(1)
     
})