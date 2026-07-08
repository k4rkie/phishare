import { pgTable, uuid, text, timestamp, integer } from "drizzle-orm/pg-core";
import { user } from "@/db/auth.schema.js";
import { pgEnum } from "node_modules/drizzle-orm/pg-core/index.cjs";

export const albumStatus = pgEnum("album_status", [
  "draft",
  "active",
  "deleted",
]);

export const album = pgTable("album", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  coverImageKey: text("cover_image_key").notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: albumStatus().notNull().default("draft"),
  imageCount: integer("image_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
