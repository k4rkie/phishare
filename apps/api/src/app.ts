import express, { Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "healthy",
  });
});

export default app;
