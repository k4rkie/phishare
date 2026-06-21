import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date();
  console.log(
    `${timestamp.toLocaleDateString()}-${timestamp.toLocaleTimeString()} : ${req.method} - ${req.url}`,
  );
  next();
};

export default logger;
