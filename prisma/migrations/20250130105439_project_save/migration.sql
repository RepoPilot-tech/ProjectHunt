/*
  Warnings:

  - You are about to drop the column `spaceId` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isDefault]` on the table `Spaces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,isDefault]` on the table `Spaces` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_spaceId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "spaceId";

-- AlterTable
ALTER TABLE "Spaces" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ProjectSpace" (
    "projectId" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectSpace_pkey" PRIMARY KEY ("projectId","spaceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Spaces_isDefault_key" ON "Spaces"("isDefault");

-- CreateIndex
CREATE UNIQUE INDEX "Spaces_userId_isDefault_key" ON "Spaces"("userId", "isDefault");

-- AddForeignKey
ALTER TABLE "ProjectSpace" ADD CONSTRAINT "ProjectSpace_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSpace" ADD CONSTRAINT "ProjectSpace_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
