export type CreateAlbumRequest = {
  name: string;
  description: string;
  coverImageName: string;
  contentType: string;
};

export type CreateAlbumResponse = {
  uploadURL: string;
  albumId: string;
};

export type AlbumCreationSuccessRequest = {
  albumId: string;
};

export type Album = {
  id: string;
  name: string;
  description: string | null;
  coverImageURL: string | undefined;
  ownerId: string;
  status: "draft" | "active" | "deleted";
  imageCount: number;
  createdAt: Date;
  updatedAt: Date;
};
