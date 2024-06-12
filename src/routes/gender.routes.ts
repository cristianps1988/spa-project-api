import { Router } from "express";
import { getGender, addGender, updateGender, deleteGender } from "../controllers/gender.controller";

const router = Router();

router.get('/', getGender)
router.post('/addnewgender', addGender)
router.patch('/:id', updateGender)
router.delete('/:id', deleteGender)

export default router