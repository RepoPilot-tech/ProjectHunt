/*
  Warnings:

  - You are about to drop the column `userId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `isDefault` on the `Spaces` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropIndex
DROP INDEX "Spaces_isDefault_key";

-- DropIndex
DROP INDEX "Spaces_userId_isDefault_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Spaces" DROP COLUMN "isDefault";
