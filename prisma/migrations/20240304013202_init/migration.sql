/*
  Warnings:

  - You are about to alter the column `fecha_hora` on the `Eventos` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `id_dispositvo` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Eventos` ADD COLUMN `id_dispositvo` VARCHAR(191) NOT NULL,
    MODIFY `fecha_hora` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Dispositivo` (
    `id` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Dispositivo_alias_key`(`alias`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Eventos` ADD CONSTRAINT `Eventos_id_dispositvo_fkey` FOREIGN KEY (`id_dispositvo`) REFERENCES `Dispositivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
