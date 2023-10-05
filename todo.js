const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs');
const PORT = 3000;
const  cors = require('cors');
const app = express();
app.use(bodyParser.json()); 
app.use(cors())


app.get('/todos' , (req ,res) =>{

     function callback(data){
          console.log(data);
     } 
     const todos = fs.readFileSync('data.json' , 'utf-8' , callback);
     return res.json(JSON.parse(todos));
})

ctr = 1;
app.post('/todos' , (req ,res) =>{

     newTodo = {
          "id" : ctr,
          "title" : req.body.title,
          "description" : req.body.description
     }
     ctr++;

     const todos = JSON.parse(fs.readFileSync('data.json' , 'utf-8' ));

     todos.push(newTodo);
     fs.writeFileSync('data.json' , JSON.stringify(todos) , 'utf-8')

     return res.status(201).send("New todo inseeted succesfully");
});


app.listen(PORT, ()=>{
     console.log(`server is running on  ${PORT} PORT`);
})