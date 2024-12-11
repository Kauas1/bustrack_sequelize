import { Router } from "express";
import { listarLinhas } from "../controllers/linhasController.js";
import { criarLinha } from "../controllers/linhasController.js";
import { listarLinhaId } from "../controllers/linhasController.js";
import { editarLinha } from "../controllers/linhasController.js";

const router = Router()

router.post('/', criarLinha)
router.get('/', listarLinhas)
router.get('/:id', listarLinhaId)
router.put('/:id', editarLinha)

export default router;