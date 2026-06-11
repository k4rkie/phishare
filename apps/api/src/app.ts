import express, { Request, Response } from "express";

const app = express();

app.get("/api/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "healthy",
  });
});

export default app;
