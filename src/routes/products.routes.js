import { Router } from "express";
import { createProduct, getProductsById } from "../controllers/product.controller.js";

const router = Router()

router.post('/product', createProduct)
router.get('/products/:idManicurista', getProductsById)

export default router