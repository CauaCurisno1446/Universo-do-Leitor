/*
  Warnings:

  - Made the column `cpf` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `cpf` VARCHAR(191) NOT NULL;
