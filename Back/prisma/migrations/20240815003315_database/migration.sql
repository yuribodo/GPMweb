-- CreateTable
CREATE TABLE "Discentes" (
    "id" SERIAL NOT NULL,
    "matricula" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "lates" TEXT NOT NULL,
    "date_born" TIMESTAMP(3) NOT NULL,
    "projetoId" INTEGER NOT NULL,
    "tamanho_camisa" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "bolsista" BOOLEAN NOT NULL,

    CONSTRAINT "Discentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doscentes" (
    "id" SERIAL NOT NULL,
    "siape" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contato" TEXT NOT NULL,

    CONSTRAINT "Doscentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "titulo_projeto" TEXT NOT NULL,
    "edital" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "metas" TEXT NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Noticia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "projetoId" INTEGER NOT NULL,

    CONSTRAINT "Noticia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DoscentesToProjeto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Discentes_matricula_key" ON "Discentes"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Doscentes_siape_key" ON "Doscentes"("siape");

-- CreateIndex
CREATE UNIQUE INDEX "Doscentes_email_key" ON "Doscentes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DoscentesToProjeto_AB_unique" ON "_DoscentesToProjeto"("A", "B");

-- CreateIndex
CREATE INDEX "_DoscentesToProjeto_B_index" ON "_DoscentesToProjeto"("B");

-- AddForeignKey
ALTER TABLE "Discentes" ADD CONSTRAINT "Discentes_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Noticia" ADD CONSTRAINT "Noticia_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoscentesToProjeto" ADD CONSTRAINT "_DoscentesToProjeto_A_fkey" FOREIGN KEY ("A") REFERENCES "Doscentes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoscentesToProjeto" ADD CONSTRAINT "_DoscentesToProjeto_B_fkey" FOREIGN KEY ("B") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
