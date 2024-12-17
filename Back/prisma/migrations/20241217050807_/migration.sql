-- DropForeignKey
ALTER TABLE "Discentes" DROP CONSTRAINT "Discentes_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "Noticia" DROP CONSTRAINT "Noticia_projetoId_fkey";

-- AddForeignKey
ALTER TABLE "Discentes" ADD CONSTRAINT "Discentes_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
