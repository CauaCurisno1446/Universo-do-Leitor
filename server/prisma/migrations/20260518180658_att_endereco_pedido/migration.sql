/*
  Warnings:

  - You are about to drop the column `enderecoBairro` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoCep` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoCidade` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoEstado` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoNumero` on the `pedido` table. All the data in the column will be lost.
  - You are about to drop the column `enderecoRua` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `enderecoEntrega` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `enderecoBairro`,
    DROP COLUMN `enderecoCep`,
    DROP COLUMN `enderecoCidade`,
    DROP COLUMN `enderecoEstado`,
    DROP COLUMN `enderecoNumero`,
    DROP COLUMN `enderecoRua`,
    ADD COLUMN `enderecoEntrega` VARCHAR(191) NOT NULL;
