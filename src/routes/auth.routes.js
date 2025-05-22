import { Router } from "express";
import { registerController, loginController, logoutController } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/logout', logoutController)
router.get('/dashboard', authRequired,(req,res) => res.send('acceso permitido'))

export default router