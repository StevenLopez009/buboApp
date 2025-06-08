import { Router } from "express";
import { registerController, loginController, logoutController, getUsersController, deleteUserController } from "../controllers/auth.controller.js";

const router = Router()

router.post('/register', registerController)
router.post('/login',  loginController)
router.post('/logout', logoutController)
router.get('/users', getUsersController)
router.delete('/users/:id', deleteUserController);

export default router