/*
  Warnings:

  - You are about to drop the column `isPublic` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the `todo_members` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `todolistId` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `todo_members` DROP FOREIGN KEY `todo_members_todoId_fkey`;

-- DropForeignKey
ALTER TABLE `todo_members` DROP FOREIGN KEY `todo_members_userId_fkey`;

-- DropForeignKey
ALTER TABLE `todos` DROP FOREIGN KEY `todos_ownerId_fkey`;

-- DropIndex
DROP INDEX `todos_ownerId_fkey` ON `todos`;

-- AlterTable
ALTER TABLE `todos` DROP COLUMN `isPublic`,
    DROP COLUMN `ownerId`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `todolistId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `todo_members`;

-- CreateTable
CREATE TABLE `todolists` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `isPublic` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todolist_members` (
    `id` VARCHAR(191) NOT NULL,
    `todolistId` VARCHAR(191) NOT NULL,
    `role` ENUM('VISITOR', 'EDITOR') NOT NULL DEFAULT 'VISITOR',
    `memberId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `todolist_members_todolistId_memberId_key`(`todolistId`, `memberId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `todos` ADD CONSTRAINT `todos_todolistId_fkey` FOREIGN KEY (`todolistId`) REFERENCES `todolists`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todolists` ADD CONSTRAINT `todolists_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todolist_members` ADD CONSTRAINT `todolist_members_todolistId_fkey` FOREIGN KEY (`todolistId`) REFERENCES `todolists`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `todolist_members` ADD CONSTRAINT `todolist_members_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
