import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

export const registerController=async (req, res)=>{
  const { username, email, password, contact, rh, eps, age, rol, image } = req.body;

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
      image
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

export const getUsersController=async (req, res)=>{
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'contact', 'rh', 'eps', 'age', 'rol', 'image'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const deleteUserController=async (req, res)=>{
  const { id } = req.params;

  try {
    const userFound = await User.findByPk(id);
    if(!userFound) return res.status(400).json({message:"user not found"})

    await userFound.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


export const loginController=async (req, res)=>{
 const {  email, password } = req.body;

  try {
    const userFound = await User.findOne({ where: { email } });
    if(!userFound) return res.status(400).json({message:"user not found"})

    const isMatch = await bcrypt.compare(password, userFound.password);
    if(!isMatch) return res.status(400).json({message:"Incorrect password"})

    const token = await createAccessToken({id:userFound.id})
    
   res.cookie('token', token)
    res.json({
      id: userFound.id,
      username:userFound.username,
      email:userFound.email,
      rol: userFound.rol
    })
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

export const logoutController =async (req,res)=>{
  res.cookie('token',"",{
    expires:new Date(0)
  })
  return res.sendStatus(200)
}