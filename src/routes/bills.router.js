import { Router } from "express";
import { createBillController, getBillController } from "../controllers/bills.controller.js";

const router = Router()

router.post('/bills', createBillController)
router.get("/bills", getBillController)

export default router