import { ApiError } from "@phishare/shared";
import { NextFunction, Request, Response } from "express";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response<ApiError>,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const errMessage = err.message || "Internal Server error";

  return res.status(statusCode).json({
    success: false,
    error: {
      message: errMessage,
      type: "SERVER",
    },
  });
};
