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
    const { siape, nome, email, contato, projetosId } = req.body;
    try {


        const existingDosente = await prisma.doscentes.findUnique({
            where: { siape: siape },
        });

        if (existingDosente) {
            return res.status(400).json({ error: 'Um docente com esse siape já existe.' });
        }

        let projetoIds: number[] = [];
        if (projetosId) {
            // Divide os IDs de projetos em um array e converte para números
            projetoIds = projetosId
                .split(',')
                .map((id: string) => parseInt(id.trim(), 10))
                .filter((id: number) => !isNaN(id));

            // Verifica se todos os projetos existem
            const projetos = await prisma.projeto.findMany({
                where: {
                    id: {
                        in: projetoIds,
                    },
                },
            });

            if (projetos.length !== projetoIds.length) {
                return res.status(400).json({ error: 'Um ou mais projetos não foram encontrados. Verifique os projetoIds.' });
            }
        }

        const newDoscentes = await prisma.doscentes.create({
            data: {
                siape,
                nome,
                email,
                contato,
                projetosId: projetosId, 
                projetos: {
                    connect: projetoIds.map((id: number) => ({ id })), 
                },
            },
        });
        res.status(201).json(newDoscentes);
    } catch (error) {
        console.error('Erro ao criar docente:', error); 
        res.status(500).json({ error: 'Falha ao criar docente' });
    }
};


export const updateDoscentes = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { siape, nome, email, contato, projetosId } = req.body;
    try {
        const updatedDoscentes = await prisma.doscentes.update({
            where: { id: Number(id) },
            data: {
                siape,
                nome,
                email,
                contato,
                projetosId,
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