const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

mongoose.connect('mongodb+srv://danishbelals:Capricorn%4012345@cluster1.5sekt6s.mongodb.net/courses').then(()=>{
     console.log("connection");
});
