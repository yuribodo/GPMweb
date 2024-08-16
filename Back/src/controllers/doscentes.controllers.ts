import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllDoscentes = async (req: Request, res: Response) => {
    try {
        const doscentes = await prisma.doscentes.findMany();
        res.json(doscentes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve doscentes' });
    }
};

export const getDoscentesById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const doscente = await prisma.doscentes.findUnique({ where: { id: Number(id) } });
        if (doscente) {
            res.json(doscente);
        } else {
            res.status(404).json({ error: 'Doscentes not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve doscente' });
    }
};

export const createDoscentes = async (req: Request, res: Response) => {
    const { siape, nome, email, contato } = req.body;
    try {
        const newDoscentes = await prisma.doscentes.create({
            data: {
                siape,
                nome,
                email,
                contato,
            },
        });
        res.status(201).json(newDoscentes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create doscente' });
    }
};

export const updateDoscentes = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { siape, nome, email, contato } = req.body;
    try {
        const updatedDoscentes = await prisma.doscentes.update({
            where: { id: Number(id) },
            data: {
                siape,
                nome,
                email,
                contato,
            },
        });
        res.json(updatedDoscentes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update doscente' });
    }
};

export const deleteDoscentes = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.doscentes.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete doscente' });
    }
};