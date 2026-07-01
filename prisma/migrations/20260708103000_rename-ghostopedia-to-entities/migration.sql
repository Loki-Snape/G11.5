-- AlterTable
ALTER TABLE "ghostopedia" RENAME TO "entities";

-- AlterTable
ALTER TABLE "entities" ADD COLUMN "image_url" VARCHAR(255);
