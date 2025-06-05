import { Router } from "express";
import { createProduct, getProductsById, payProduct } from "../controllers/product.controller.js";

const router = Router()

router.post('/product', createProduct)
router.get('/products/:idManicurista', getProductsById)
router.put("/product/pay/:id", payProduct);

export default router