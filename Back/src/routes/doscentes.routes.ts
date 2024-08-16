import express from 'express';
import {
    getAllDoscentes,
    getDoscentesById,
    createDoscentes,
    updateDoscentes,
    deleteDoscentes,
} from '../controllers/doscentes.controllers';

const router = express.Router();

router.get('/', getAllDoscentes);
router.get('/:id', getDoscentesById);
router.post('/', createDoscentes);
router.put('/:id', updateDoscentes);
router.delete('/:id', deleteDoscentes);

export default router;
