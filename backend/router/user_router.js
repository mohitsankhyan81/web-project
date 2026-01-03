import express from 'express'
import { login, logout, register } from '../controller/user_controller.js';

const userrouter=express.Router();

userrouter.post("/register",register);
userrouter.post("/login",login)
userrouter.get("/logout",logout);
export default userrouter;