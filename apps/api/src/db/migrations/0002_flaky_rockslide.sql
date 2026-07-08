CREATE TYPE "public"."album_status" AS ENUM('draft', 'active', 'deleted');--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "status" "album_status" DEFAULT 'draft' NOT NULL;