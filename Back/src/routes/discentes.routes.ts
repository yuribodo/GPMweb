import express from 'express';
import {
    getAllDiscentes,
    getDiscenteById,
    createDiscente,
    updateDiscente,
    deleteDiscente,
    getDiscentesByProjetoId,
} from '../controllers/discentes.controllers';

const router = express.Router();

router.get('/', getAllDiscentes);
router.get('/:id', getDiscenteById);
router.post('/', createDiscente);
router.put('/:id', updateDiscente);
router.delete('/:id', deleteDiscente);
router.get('/projeto/:projetoId', getDiscentesByProjetoId);

export default router;
