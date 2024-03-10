import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
     await prisma.post.create({
          data :{
               title: "Go to Gym",
               content: "Gym will shape you",
               author:{
                    connect:{
                         id:1
                    }
               }
          }
     })
     
}
main()
.then(async ()=>{
     console.log("done");
     await prisma.$disconnect();
})
.catch(async (e)=>{
     console.log(e);
     await prisma.$disconnect();
     process.exit(1)
     
})