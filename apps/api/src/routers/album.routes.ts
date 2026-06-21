import { Router } from "express";

const albumRouter = Router();

albumRouter.get("", (req, res) => {
  return res.status(200).send("Album");
});

// albumRouter.post("");

export default albumRouter;
