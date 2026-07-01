-- AlterTable
ALTER TABLE "applications" RENAME COLUMN "skillset" TO "why_hire_you";
ALTER TABLE "applications" ADD COLUMN "email" VARCHAR(255);
ALTER TABLE "applications" ADD COLUMN "phone" VARCHAR(255);
ALTER TABLE "applications" ADD COLUMN "interested_role" VARCHAR(255);

-- Populate existing rows with placeholder data so that NOT NULL constraint succeeds
UPDATE "applications" SET "email" = 'placeholder@example.com', "phone" = '1234567890', "interested_role" = 'Web Developer' WHERE "email" IS NULL;

-- Enforce constraints
ALTER TABLE "applications" ALTER COLUMN "email" SET NOT NULL;
ALTER TABLE "applications" ALTER COLUMN "phone" SET NOT NULL;
ALTER TABLE "applications" ALTER COLUMN "interested_role" SET NOT NULL;

-- Drop obsolete contact column
ALTER TABLE "applications" DROP COLUMN "contact";
