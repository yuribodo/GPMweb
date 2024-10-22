import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllNoticias = async (req: Request, res: Response) => {
    try {
        const noticias = await prisma.noticia.findMany();
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve noticias' });
    }
};

export const getNoticiaById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const noticia = await prisma.noticia.findUnique({ where: { id: Number(id) } });
        if (noticia) {
            res.json(noticia);
        } else {
            res.status(404).json({ error: 'Noticia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve noticia' });
    }
};

export const createNoticia = async (req: Request, res: Response) => {
    const { titulo, tipo, link, projetoId } = req.body;
    
    
    try {
        const newNoticia = await prisma.noticia.create({
            data: {
                titulo,
                tipo,
                link,
                projetoId,
            },
        });
        res.status(201).json(newNoticia);
    } catch (error) {
        console.error("Erro ao criar notícia:", error); // Log do erro
        res.status(500).json({ error: 'Failed to create noticia' });
    }
};

export const updateNoticia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { titulo, tipo, link, projetoId } = req.body;
    try {
        const updatedNoticia = await prisma.noticia.update({
            where: { id: Number(id) },
            data: {
                titulo,
                tipo,
                link,
                projetoId,
            },
        });
        res.json(updatedNoticia);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update noticia' });
    }
};

export const deleteNoticia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.noticia.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete noticia' });
    }
};
