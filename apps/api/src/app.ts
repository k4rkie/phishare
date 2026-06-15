import express, { Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

const app = express();

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "healthy",
  });
});

export default app;
