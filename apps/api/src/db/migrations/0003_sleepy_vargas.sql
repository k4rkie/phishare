ALTER TABLE "album" RENAME COLUMN "cover_photo_key" TO "cover_image_key";--> statement-breakpoint
ALTER TABLE "album" ADD COLUMN "image_count" integer DEFAULT 0;