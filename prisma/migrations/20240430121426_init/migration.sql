/*
  Warnings:

  - You are about to alter the column `fecha_hora` on the `Eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `accion` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Eventos` ADD COLUMN `accion` VARCHAR(191) NOT NULL,
    MODIFY `fecha_hora` DATETIME NOT NULL;
