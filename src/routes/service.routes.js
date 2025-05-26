import { Router } from "express";
import { getServicesController, serviceController } from "../controllers/service.controller.js";

const router = Router()

router.post('/service', serviceController)
router.get('/services', getServicesController)

export default router