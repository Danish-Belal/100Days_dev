const express = require('express')
const app = express()
const port = 3002
import { userInput  } from "@repo/common"
app.use(express.json());

app.get('/', (req: any, res: any) => {
     let parsedUser = userInput.safeParse(req.body);
     if (!parsedUser.success) {
       res.send('Incorrect input for User!')
       return;
     }
     res.send('correct input!')
   })
   
   app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
   })