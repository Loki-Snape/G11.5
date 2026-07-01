-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "applications" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "skillset" TEXT NOT NULL,
    "contact" VARCHAR(255) NOT NULL,
    "motivation" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'Review Pending',
    "submitted_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cases" (
    "id" SERIAL NOT NULL,
    "tracking_number" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "description" TEXT,

    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment" (
    "id" SERIAL NOT NULL,
    "gear_name" VARCHAR(255) NOT NULL,
    "classification" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ghostopedia" (
    "id" SERIAL NOT NULL,
    "entity_name" VARCHAR(255) NOT NULL,
    "tier" VARCHAR(50) NOT NULL,
    "strength" TEXT NOT NULL,
    "weakness" TEXT NOT NULL,
    "identification_method" TEXT NOT NULL,
    "brief_bio" TEXT NOT NULL,

    CONSTRAINT "ghostopedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "tier" VARCHAR(50) NOT NULL,
    "clearance_level" VARCHAR(50) NOT NULL,
    "portraitUrl" VARCHAR(255),

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cases_tracking_number_key" ON "cases"("tracking_number");

-- CreateIndex
CREATE UNIQUE INDEX "ghostopedia_entity_name_key" ON "ghostopedia"("entity_name");

-- CreateIndex
CREATE UNIQUE INDEX "members_slug_key" ON "members"("slug");

