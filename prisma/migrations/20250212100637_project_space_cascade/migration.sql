/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Spaces` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProjectSpace" DROP CONSTRAINT "ProjectSpace_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSpace" DROP CONSTRAINT "ProjectSpace_spaceId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Spaces_id_key" ON "Spaces"("id");

-- AddForeignKey
ALTER TABLE "ProjectSpace" ADD CONSTRAINT "ProjectSpace_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSpace" ADD CONSTRAINT "ProjectSpace_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Spaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
