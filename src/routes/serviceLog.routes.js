import { Router } from "express";
import { serviceLogController, getServicesLogController, getAllServicesLog, aproveServicesLog, getApprovedServicesLog } from "../controllers/serviceLog.controller.js";
import { approveAnotherService, createAnotherServiceController, getAnotherServicesController } from "../controllers/anotherService.js";

const router = Router()

router.post('/serviceLog', serviceLogController)
router.get("/serviceLog/manicurista/:idManicurista",  getServicesLogController)
router.get('/serviceLog/admin', getAllServicesLog)
router.put("/services/approve/:id", aproveServicesLog);
router.get("/services/getApprove", getApprovedServicesLog);
router.post('/anotherService', createAnotherServiceController);
router.get('/anotherServices', getAnotherServicesController)
router.put('/anotherService/approve/:id', approveAnotherService)

export default router;