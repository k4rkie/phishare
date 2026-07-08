import { album } from "@/db/album.schema.js";
import { db } from "@/db/index.js";
import { CreateAlbumRequest } from "@phishare/shared";
import { eq } from "drizzle-orm";

export const getUsersAlbums = async (userId: string) => {
  const albums = await db.select().from(album).where(eq(album.ownerId, userId));
  return albums;
};

export const createAlbum = async ({
  name,
  description,
  coverImageName,
  userId,
}: CreateAlbumRequest & { userId: string }) => {
  const albumId = crypto.randomUUID();
  const [newAlbum] = await db
    .insert(album)
    .values({
      id: albumId,
      name,
      description,
      ownerId: userId,
      coverImageKey: `album/${albumId}/cover/${coverImageName}`,
    })
    .returning();
  return newAlbum;
};

export const handleAlbumCreationSuccess = async (
  userId: string,
  albumId: string,
) => {
  const [existingAlbum] = await db
    .select()
    .from(album)
    .where(eq(album.id, albumId));
  if (!existingAlbum) {
    console.log("Album doesnt exist");

    return;
  }
  if (existingAlbum.ownerId !== userId) {
    console.log("You dont own the album");
    return;
  }
  const [updatedAlbum] = await db
    .update(album)
    .set({
      status: "active",
    })
    .where(eq(album.id, albumId))
    .returning();
  console.log("Update draft to active");

  return updatedAlbum;
};
