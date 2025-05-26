import { Router } from "express";
import { deleteServiceController, getServicesController, serviceController } from "../controllers/service.controller.js";

const router = Router()

router.post('/service', serviceController)
router.get('/services', getServicesController)
router.delete('/service/:id', deleteServiceController)

export default router