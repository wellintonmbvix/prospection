/*
  Warnings:

  - Added the required column `id_usuario` to the `prospeccao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `prospeccao` ADD COLUMN `id_usuario` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `prospeccao` ADD CONSTRAINT `prospeccao_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`usuarioId`) ON DELETE RESTRICT ON UPDATE CASCADE;
