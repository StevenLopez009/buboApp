import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const registerController=async (req, res)=>{
  const { username, email, password, contact, rh, eps, age, rol } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser =  new User({
      username,
      email,
      password: hashedPassword,
      contact,
    rh,
      eps,
      age,
      rol,
    });
    const userSaved= await newUser.save()
    const token = await createAccessToken({id:userSaved.id})
    
   res.cookie('token', token)
    res.json({
      id: userSaved.id,
      username:userSaved.username,
      email:userSaved.email
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const loginController= (req, res)=>{
  res.send('login')
}