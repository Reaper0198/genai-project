import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from 'cors';
dotenv.config();
const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth',authRouter);

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||'Internal Server Error';
  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});