/*
  Warnings:

  - You are about to alter the column `fecha_hora` on the `Eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `estado` to the `Dispositivo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dispositivo` ADD COLUMN `estado` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `Eventos` MODIFY `fecha_hora` DATETIME NOT NULL;
