import jwt from 'jsonwebtoken'
import {User} from '../model/user_model.js'

const createtokenandsavecookies= async (userId,res)=>{
  const token= jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:"7d"
  })
  res.cookie("jwt",token,{
    httpOnly:true,
    secure:true,
    sameSites:"strict"
  })

  await User.findByIdAndUpdate(userId,{token})
  return token;
}
export default createtokenandsavecookies;