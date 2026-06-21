import express, { Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth.js";
import cors from "cors";
import albumRouter from "./routers/album.routes.js";
import logger from "@/middlewares/logger.middleware.js";

const app = express();

// Middlewares
app.use(logger);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Better auth catch all route
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "healthy",
  });
});

app.use("/api/albums", albumRouter);

export default app;
