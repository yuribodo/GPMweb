import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllProjetos = async (req: Request, res: Response) => {
    try {
        const projetos = await prisma.projeto.findMany();
        res.json(projetos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve projetos' });
    }
};

export const getProjetoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const projeto = await prisma.projeto.findUnique({ where: { id: Number(id) } });
        if (projeto) {
            res.json(projeto);
        } else {
            res.status(404).json({ error: 'Projeto not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve projeto' });
    }
};

export const createProjeto = async (req: Request, res: Response) => {
    const { titulo_projeto, edital, area, objetivo, metas } = req.body;
    try {
        const newProjeto = await prisma.projeto.create({
            data: {
                titulo_projeto,
                edital,
                area,
                objetivo,
                metas,
            },
        });
        res.status(201).json(newProjeto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create projeto' });
    }
};

export const updateProjeto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { titulo_projeto, edital, area, objetivo, metas } = req.body;
    try {
        const updatedProjeto = await prisma.projeto.update({
            where: { id: Number(id) },
            data: {
                titulo_projeto,
                edital,
                area,
                objetivo,
                metas,
            },
        });
        res.json(updatedProjeto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update projeto' });
    }
};

export const deleteProjeto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.projeto.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete projeto' });
    }
};
