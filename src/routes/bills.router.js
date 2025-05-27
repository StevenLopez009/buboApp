import { Router } from "express";
import { createBillController } from "../controllers/bills.controller.js";

const router = Router()

router.post('/bills', createBillController)

export default router