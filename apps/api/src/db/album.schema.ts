import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "@/db/auth.schema.js";

export const album = pgTable("album", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  coverPhotoKey: text("cover_photo_key"),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
