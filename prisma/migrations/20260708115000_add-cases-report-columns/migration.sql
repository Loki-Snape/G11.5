-- AlterTable
ALTER TABLE "cases" ADD COLUMN "reporter_name" VARCHAR(255);
ALTER TABLE "cases" ADD COLUMN "reporter_phone" VARCHAR(50);
ALTER TABLE "cases" ADD COLUMN "reporter_email" VARCHAR(255);
ALTER TABLE "cases" ADD COLUMN "activity_types" TEXT;
ALTER TABLE "cases" ADD COLUMN "timing" VARCHAR(50);
ALTER TABLE "cases" ADD COLUMN "danger_level" VARCHAR(255);
