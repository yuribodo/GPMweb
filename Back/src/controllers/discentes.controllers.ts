import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAllDiscentes = async (req: Request, res: Response) => {
  try {
      const discentes = await prisma.discentes.findMany();
      res.json(discentes);
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve discentes' });
  }
};

export const getDiscenteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      const discente = await prisma.discentes.findUnique({ where: { id: Number(id) } });
      if (discente) {
          res.json(discente);
      } else {
          res.status(404).json({ error: 'Discente not found' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve discente' });
  }
};

export const createDiscente = async (req: Request, res: Response) => {
  const { matricula, nome, cpf, lates, date_born, projetoId, tamanho_camisa, contato, bolsista } = req.body;
  try {
      const newDiscente = await prisma.discentes.create({
          data: {
              matricula,
              nome,
              cpf,
              lates,
              date_born: new Date(date_born),
              projetoId,
              tamanho_camisa,
              contato,
              bolsista,
          },
      });
      res.status(201).json(newDiscente);
  } catch (error) {
      res.status(500).json({ error: 'Failed to create discente' });
  }
};

export const updateDiscente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { matricula, nome, cpf, lates, date_born, projetoId, tamanho_camisa, contato, bolsista } = req.body;
  try {
      const updatedDiscente = await prisma.discentes.update({
          where: { id: Number(id) },
          data: {
              matricula,
              nome,
              cpf,
              lates,
              date_born: new Date(date_born),
              projetoId,
              tamanho_camisa,
              contato,
              bolsista,
          },
      });
      res.json(updatedDiscente);
  } catch (error) {
      res.status(500).json({ error: 'Failed to update discente' });
  }
};

export const deleteDiscente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      await prisma.discentes.delete({ where: { id: Number(id) } });
      res.status(204).send();
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete discente' });
  }
};