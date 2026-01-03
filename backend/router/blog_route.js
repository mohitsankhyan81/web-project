const express=require('express');

import { createbolg } from '../controller/blog_controller';

const userrouter=express.Router();

userrouter.post("/createblog",createbolg);
export default userrouter;