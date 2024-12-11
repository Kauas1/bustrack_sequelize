import { Router } from "express";
import { criarOnibus, listarOnibus, listarOnibusPorId, editarOnibus } from "../controllers/OnibusController.js";

const router = Router()

router.post('/', criarOnibus)
router.get('/', listarOnibus)
router.get('/:id', listarOnibusPorId)
router.put('/:id', editarOnibus)
export default router;