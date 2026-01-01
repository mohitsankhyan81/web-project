import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import userrouter from './router/user_router.js';
const app=express();
dotenv.config();
const MONGO_URI=process.env.MONGO_URI;

//file fileUpload

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/",
}));

app.use(express.json());
app.use(express.urlencoded({ extended:true }));




try{
  mongoose.connect(MONGO_URI)
  console.log("CONNECTED TO THE DATABASE")
}catch(error){
  console.log(error)
}

app.use("/api/users",userrouter);

//cloudinary
cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret,
});


const port=process.env.PORT;

app.listen(port,(req,res)=>{
  console.log(`http://localhost:${port}  server is started`);
})

