/*
  Warnings:

  - You are about to alter the column `fecha_hora` on the `Eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[usuario]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Eventos` MODIFY `fecha_hora` DATETIME NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_usuario_key` ON `User`(`usuario`);
