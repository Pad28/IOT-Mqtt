-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(30) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `User_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dispositivo` (
    `id` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(20) NOT NULL,
    `estado` VARCHAR(20) NOT NULL,
    `clave` INTEGER NULL,
    `claveHuella` INTEGER NULL,

    UNIQUE INDEX `Dispositivo_alias_key`(`alias`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eventos` (
    `id` VARCHAR(191) NOT NULL,
    `fecha_hora` DATETIME NOT NULL,
    `accion` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_dispositvo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Eventos` ADD CONSTRAINT `Eventos_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eventos` ADD CONSTRAINT `Eventos_id_dispositvo_fkey` FOREIGN KEY (`id_dispositvo`) REFERENCES `Dispositivo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
