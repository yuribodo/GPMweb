/*
  Warnings:

  - Added the required column `projetoId` to the `Doscentes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doscentes" ADD COLUMN     "projetoId" INTEGER NOT NULL;
