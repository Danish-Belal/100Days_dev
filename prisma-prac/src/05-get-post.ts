import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main(){
     const post = await prisma.post.findMany({
          include:{
               author : {
                    select :{
                         email: true
                    }
               }
          }
     });
     console.log(post);
     
}
main()
  .then(async () => {
    console.log("done");
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })