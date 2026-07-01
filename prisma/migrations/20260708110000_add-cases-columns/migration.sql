-- AlterTable
ALTER TABLE "cases" ADD COLUMN "created_by" VARCHAR(255);
ALTER TABLE "cases" ADD COLUMN "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "cases" ADD COLUMN "start_date" DATE;
ALTER TABLE "cases" ADD COLUMN "end_date" DATE;
ALTER TABLE "cases" ADD COLUMN "threat_rating" VARCHAR(50);
ALTER TABLE "cases" ADD COLUMN "case_file_link" VARCHAR(500);
ALTER TABLE "cases" ADD COLUMN "location" VARCHAR(255);
