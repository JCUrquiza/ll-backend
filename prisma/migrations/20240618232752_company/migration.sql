/*
  Warnings:

  - Added the required column `abreviatura` to the `Empresas` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `estilo` on the `Luchadores` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Estilo" AS ENUM ('Rudo', 'Tecnico');

-- AlterTable
ALTER TABLE "Empresas" ADD COLUMN     "abreviatura" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Luchadores" DROP COLUMN "estilo",
ADD COLUMN     "estilo" "Estilo" NOT NULL;
