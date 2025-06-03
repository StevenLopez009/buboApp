import { Router } from "express";
import { deleteServiceController, editService, getServiceById, getServicesController, serviceController } from "../controllers/service.controller.js";

const router = Router()

router.post('/service', serviceController)
router.get('/services', getServicesController)
router.get('/service/:id', getServiceById)
router.put('/services/:id', editService)
router.delete('/service/:id', deleteServiceController)


export default router