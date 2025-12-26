-- CreateEnum
CREATE TYPE "LifePhase" AS ENUM ('STRESS', 'LONELINESS', 'ANXIETY', 'CONFUSION', 'LOW_MOTIVATION');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentPhase" "LifePhase";
