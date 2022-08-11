-- CreateTable
CREATE TABLE `cidades` (
    `counter` INTEGER NOT NULL,
    `cidadeId` INTEGER NOT NULL,
    `nomeCidade` VARCHAR(50) NOT NULL,
    `ufId` INTEGER NOT NULL,
    `uf` CHAR(2) NOT NULL,

    PRIMARY KEY (`counter`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `usuarioId` VARCHAR(191) NOT NULL,
    `nomeUsuario` VARCHAR(40) NOT NULL,
    `senhaAcesso` VARCHAR(50) NOT NULL,
    `acessoUsuarios` BOOLEAN NOT NULL DEFAULT false,
    `acessoSeguimentos` BOOLEAN NOT NULL DEFAULT false,
    `acessoProspeccao` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `usuarios_nomeUsuario_key`(`nomeUsuario`),
    PRIMARY KEY (`usuarioId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prospeccao` (
    `prospeccaoId` VARCHAR(191) NOT NULL,
    `nomeEmpresa` VARCHAR(120) NOT NULL,
    `nomeContato` VARCHAR(40) NOT NULL,
    `telefone1` VARCHAR(15) NOT NULL,
    `telefone2` VARCHAR(15) NOT NULL,
    `email1` VARCHAR(160) NOT NULL,
    `email2` VARCHAR(160) NOT NULL,
    `id_seguimento` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(50) NULL,
    `estado` CHAR(2) NULL DEFAULT 'ES',
    `proximoContato` VARCHAR(7) NULL,
    `nomeSistema` VARCHAR(35) NOT NULL,
    `observacao` LONGTEXT NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`prospeccaoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seguimentos` (
    `seguimentoId` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(80) NOT NULL,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `seguimentos_descricao_key`(`descricao`),
    PRIMARY KEY (`seguimentoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prospeccao` ADD CONSTRAINT `prospeccao_id_seguimento_fkey` FOREIGN KEY (`id_seguimento`) REFERENCES `seguimentos`(`seguimentoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
