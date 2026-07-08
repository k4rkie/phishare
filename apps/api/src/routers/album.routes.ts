import {
  createAlbumController,
  getUsersAlbumsController,
  imgUploadSuccessController,
} from "@/controllers/album.controllers.js";
import { authenticate } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const albumRouter = Router();

albumRouter.get("", authenticate, getUsersAlbumsController);
albumRouter.post("", authenticate, createAlbumController);
albumRouter.post("/success", authenticate, imgUploadSuccessController);

export default albumRouter;
