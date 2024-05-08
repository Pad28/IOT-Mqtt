/*
  Warnings:

  - You are about to alter the column `fecha_hora` on the `Eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Eventos` MODIFY `fecha_hora` DATETIME NOT NULL;
