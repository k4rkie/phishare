import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { ApiError } from "@phishare/shared";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  const errorResponse: ApiError = {
    success: false,
    error: {
      type: "AUTHENTICATION",
      message: "Failed to validate token",
    },
  };
  if (!session) {
    return res.status(401).json(errorResponse);
  }
  next();
};
