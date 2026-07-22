import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("Unhandled server error:", err);

  const status = err.status || 500;
  const message = err.message || "An unexpected server error occurred";

  res.status(status).json({
    message,
    status,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  });
}
