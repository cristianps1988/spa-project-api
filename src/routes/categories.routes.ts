import { Router } from "express";
import { getCategories, addNewCategory, updateCategory, deletCategory } from "../controllers/categories.controller";

const router = Router();

router.get('/', getCategories)
router.post('/addnewcategory', addNewCategory)
router.patch('/:id', updateCategory)
router.delete('/:id', deletCategory)

export default router