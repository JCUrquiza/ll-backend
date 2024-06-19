/*
  Warnings:

  - Added the required column `rangoPeso` to the `Campeonatos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campeonatos" ADD COLUMN     "anioFundacion" TEXT,
ADD COLUMN     "rangoPeso" TEXT NOT NULL;
