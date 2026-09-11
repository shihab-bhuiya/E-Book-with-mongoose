import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.header("authorization");

    if (!authHeader) {
      return next(
        createHttpError(401, "Authentication token is missing")
      );
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return next(
        createHttpError(401, "Invalid authentication format")
      );
    }

    const decoded = jwt.verify(token, config.JwtSecrect as string);

    if (typeof decoded === "string" || !decoded.sub) {
      return next(
        createHttpError(401, "Invalid authentication token")
      );
    }

    const authenticatedRequest = req as AuthenticatedRequest;
    authenticatedRequest.userId = decoded.sub;

    next();
  } catch (error) {
    next(
      createHttpError(401, "Invalid or expired authentication token")
    );
  }
};

export default authenticate;