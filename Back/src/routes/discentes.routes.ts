import express from 'express';
import {
    getAllDiscentes,
    getDiscenteById,
    createDiscente,
    updateDiscente,
    deleteDiscente,
} from '../controllers/discentes.controllers';

const router = express.Router();

router.get('/', getAllDiscentes);
router.get('/:id', getDiscenteById);
router.post('/', createDiscente);
router.put('/:id', updateDiscente);
router.delete('/:id', deleteDiscente);

export default router;
