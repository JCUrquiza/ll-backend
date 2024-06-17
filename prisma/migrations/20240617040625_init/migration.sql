-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('Hombre', 'Mujer');

-- CreateTable
CREATE TABLE "Empresas" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Luchadores" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estilo" TEXT NOT NULL,
    "peso" DOUBLE PRECISION,
    "altura" TEXT,
    "ciudadNacimiento" TEXT,
    "aniosLuchador" INTEGER,
    "genero" "Genero" NOT NULL,
    "debut" TIMESTAMP(3),
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Luchadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialMascarasGanadas" (
    "id" SERIAL NOT NULL,
    "luchadorGanadorId" INTEGER NOT NULL,
    "luchadorVencidoId" INTEGER NOT NULL,
    "fechaLucha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistorialMascarasGanadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialCabellerasGanadas" (
    "id" SERIAL NOT NULL,
    "luchadorGanadorId" INTEGER NOT NULL,
    "luchadorVencidoId" INTEGER NOT NULL,
    "fechaLucha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistorialCabellerasGanadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campeonatos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Campeonatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorialCampeonatos" (
    "id" SERIAL NOT NULL,
    "tiempoInicio" TIMESTAMP(3) NOT NULL,
    "tiempoFin" TIMESTAMP(3) NOT NULL,
    "defensas" INTEGER NOT NULL,
    "luchadorId" INTEGER NOT NULL,
    "campeonatoId" INTEGER NOT NULL,

    CONSTRAINT "HistorialCampeonatos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Luchadores" ADD CONSTRAINT "Luchadores_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialMascarasGanadas" ADD CONSTRAINT "HistorialMascarasGanadas_luchadorGanadorId_fkey" FOREIGN KEY ("luchadorGanadorId") REFERENCES "Luchadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCabellerasGanadas" ADD CONSTRAINT "HistorialCabellerasGanadas_luchadorGanadorId_fkey" FOREIGN KEY ("luchadorGanadorId") REFERENCES "Luchadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCampeonatos" ADD CONSTRAINT "HistorialCampeonatos_luchadorId_fkey" FOREIGN KEY ("luchadorId") REFERENCES "Luchadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialCampeonatos" ADD CONSTRAINT "HistorialCampeonatos_campeonatoId_fkey" FOREIGN KEY ("campeonatoId") REFERENCES "Campeonatos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
