/*
  Warnings:

  - A unique constraint covering the columns `[websiteLink]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_websiteLink_key" ON "Project"("websiteLink");
