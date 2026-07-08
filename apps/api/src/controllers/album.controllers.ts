import { NextFunction, Request, Response } from "express";
import { presignURL } from "@/services/objectStore.services.js";
import type {
  AlbumCreationSuccessRequest,
  ApiResponse,
  CreateAlbumRequest,
  CreateAlbumResponse,
  Album,
} from "@phishare/shared";
import {
  createAlbum,
  getUsersAlbums,
  handleAlbumCreationSuccess,
} from "@/services/album.services.js";

export const getUsersAlbumsController = async (
  req: Request,
  res: Response<ApiResponse<Album[]>>,
  next: NextFunction,
) => {
  const userId = req.user?.id;
  if (!userId) return;
  try {
    const albums = await getUsersAlbums(userId);
    let albumsWithCoverImageURLs = await Promise.all(
      albums.map(async (album) => {
        const { coverImageKey, ...rest } = album;
        const coverImageURL = await presignURL({
          action: "retrieve",
          bucket: "phishare",
          key: coverImageKey,
        });
        return { ...rest, coverImageURL };
      }),
    );
    console.log(albumsWithCoverImageURLs);
    return res.status(200).json({
      success: true,
      data: albumsWithCoverImageURLs,
    });
  } catch (err) {}
};

export const createAlbumController = async (
  req: Request,
  res: Response<ApiResponse<CreateAlbumResponse>>,
  next: NextFunction,
) => {
  const { name, description, contentType, coverImageName } =
    req.body as CreateAlbumRequest;
  const userId = req.user!.id;
  const newAlbum = await createAlbum({
    name,
    description,
    coverImageName,
    contentType,
    userId,
  });
  const signedUrl = await presignURL({
    action: "upload",
    bucket: "phishare",
    key: newAlbum.coverImageKey,
    contentType,
  });

  return res.status(201).json({
    success: true,
    data: {
      albumId: newAlbum.id,
      uploadURL: signedUrl!,
    },
  });
};

export const imgUploadSuccessController = async (
  req: Request,
  res: Response<ApiResponse<Album>>,
  next: NextFunction,
) => {
  const { albumId } = req.body as AlbumCreationSuccessRequest;
  const userId = req.user?.id;

  console.log("Recieved the update data");

  if (userId) {
    try {
      const updatedAlbum = await handleAlbumCreationSuccess(userId, albumId);
      return res.status(201).json({
        success: true,
        data: updatedAlbum!,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: {
          message: "Internal Server Error",
          type: "SERVER",
        },
      });
    }
  }
};
