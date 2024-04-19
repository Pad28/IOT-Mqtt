/*
  Warnings:

  - You are about to alter the column `clave` on the `Dispositivo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `Int`.
  - You are about to alter the column `fecha_hora` on the `Eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Dispositivo` MODIFY `clave` INTEGER NULL;

-- AlterTable
ALTER TABLE `Eventos` MODIFY `fecha_hora` DATETIME NOT NULL;
