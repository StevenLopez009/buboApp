import { Router } from "express";
import { serviceLogController, getServicesLogController, getAllServicesLog } from "../controllers/serviceLog.controller.js";

const router = Router()

router.post('/serviceLog', serviceLogController)
router.get("/serviceLog/manicurista/:idManicurista",  getServicesLogController)
router.get('/serviceLog/admin', getAllServicesLog)

export default router;