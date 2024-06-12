import { Router } from "express";
import { getProducts, addNewProduct, updateProduct, deleteProduct } from "../controllers/products.controller";

const router = Router();

router.get('/', getProducts)
router.post('/addnewproduct', addNewProduct)
router.patch('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router