import { Router } from "express";
import { deleteServiceController, getServiceById, getServicesController, serviceController } from "../controllers/service.controller.js";

const router = Router()

router.post('/service', serviceController)
router.get('/services', getServicesController)
router.get('/service/:id', getServiceById)
router.delete('/service/:id', deleteServiceController)

export default router