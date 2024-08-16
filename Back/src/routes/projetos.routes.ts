import express from 'express';
import {
    getAllProjetos,
    getProjetoById,
    createProjeto,
    updateProjeto,
    deleteProjeto,
} from '../controllers/projetos.controllers';

const router = express.Router();

router.get('/', getAllProjetos);
router.get('/:id', getProjetoById);
router.post('/', createProjeto);
router.put('/:id', updateProjeto);
router.delete('/:id', deleteProjeto);

export default router;
