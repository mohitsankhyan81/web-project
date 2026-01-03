import { v2 as cloudinary } from 'cloudinary';
import {User} from '../model/user_model.js' 
import bcrypt from 'bcryptjs';
import createtokenandsavecookies from '../jwt/authToken.js'

export const register=async (req,res)=>{
  try{
  if(!req.files|| Object.keys(req.files).length===0){
    return res.status(400).json({messege:"No file uploded"});
  }

  const {photo}=req.files;
  const allowedformat=["image/jpeg","image/png","image/webp"];

  if(!allowedformat.includes(photo.mimetype)){
    return res.status(400).json({messege:"Invalid photo format . ONly jpg and png are allowed!"});
  }

  const {email,phone,name,role,education,password}=req.body;

  if(!email || !phone ||!name || !role || !education|| !password){
    return res.status(400).json({messege:"Enter the valid data"});
  }

  const user=await User.findOne({email});

  if(user){
    return res.status(400).json({messege:"The Email is already registerd"});
  }

  const cloudinaryresponce=await cloudinary.uploader.upload(
    photo.tempFilePath
  );

  if(!cloudinaryresponce || cloudinaryresponce.error){
    return res.status(500).json({messege:"Image upload failed"});
  }

  const hashpassword=await bcrypt.hash(password,10);

  const newUser = new User({
    email,
    phone,
    name,
    role,
    education,
    password:hashpassword,
    photo: {
      public_id: cloudinaryresponce.public_id,
      url: cloudinaryresponce.url
    }
  });

  await newUser.save();

  if(newUser){
    const token= await createtokenandsavecookies(newUser._id,res)
    return res.status(201).json({messege:"Data is register sucessfully",user:newUser,token:token});
  }
}
catch(error){
  console.log(error);
}
};


export const login=async(req,res)=>{
  const {email,password,role}=req.body;
  try{
    if(!email||!password||!role){
      return res.status(400).json({messege:"Please Fill required fields"});
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
      return res.status(400).json({messege:"User cretentials is not correct"});
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(400).json({messege:"Invalid email or password"});
    }

    if(user.role!==role){
      return res.status(400).json({messege:`given role ${role} not found`});
    }

    const token =await createtokenandsavecookies(user._id,res);

    return res.status(200).json({
      messege:"User login sucessfully",
      use:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
      },
      token:token
    });
  }
  catch(error){
    console.log(error)
    return res.status(500).json({error:"Internal server error"});
  }
}

export const logout=(req,res)=>{
  res.clearCookie("jwt",{httpOnly:true});
  res.status(200).json({message:"User logout sucessfully"})
}