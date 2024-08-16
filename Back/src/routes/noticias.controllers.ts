import express from 'express';
import {
    getAllNoticias,
    getNoticiaById,
    createNoticia,
    updateNoticia,
    deleteNoticia,
} from '../controllers/noticias.controllers';

const router = express.Router();

router.get('/', getAllNoticias);
router.get('/:id', getNoticiaById);
router.post('/', createNoticia);
router.put('/:id', updateNoticia);
router.delete('/:id', deleteNoticia);

export default router;
