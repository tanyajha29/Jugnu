/*
  Warnings:

  - Changed the type of `phase` on the `DailyMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "DailyMessage" DROP COLUMN "phase",
ADD COLUMN     "phase" "LifePhase" NOT NULL;
