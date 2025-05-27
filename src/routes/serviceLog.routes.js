import { Router } from "express";
import { serviceLogController, getServicesLogController } from "../controllers/serviceLog.controller.js";

const router = Router()

router.post('/serviceLog', serviceLogController)
router.get("/serviceLog/manicurista/:idManicurista",  getServicesLogController)

export default router;