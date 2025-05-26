import { Router } from "express";
import { serviceLogController } from "../controllers/serviceLog.controller.js";

const router = Router()

router.post('/serviceLog', serviceLogController)

export default router;