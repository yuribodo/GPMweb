/*
  Warnings:

  - You are about to drop the column `projetoId` on the `Doscentes` table. All the data in the column will be lost.
  - Added the required column `projetosId` to the `Doscentes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doscentes" DROP COLUMN "projetoId",
ADD COLUMN     "projetosId" TEXT NOT NULL;
