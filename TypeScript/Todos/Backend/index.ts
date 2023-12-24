import express from 'express';
const app = express();
import mongoose from 'mongoose';
const PORT = 3000;
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
import cors from "cors";

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
