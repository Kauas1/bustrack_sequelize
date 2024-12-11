import { Router } from "express";
import { criarMotorista, listarMotoristas, listarMotoristasPorId, deletarMotorista, editarMotorista } from "../controllers/motoristaController.js";

const router = Router()

router.post('/', criarMotorista)
router.get('/', listarMotoristas)
router.get('/:id', listarMotoristasPorId)
router.delete('/:id', deletarMotorista)
router.put('/:id', editarMotorista)
export default router;