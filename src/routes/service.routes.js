import { Router } from "express";
import { serviceController } from "../controllers/service.controller.js";

const router = Router()

router.post('/service', serviceController)

export default router