/*
  Warnings:

  - Made the column `spaceId` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_spaceId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "spaceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Spaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
