import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";


export interface AuthenticatedRequest extends Request {
    userId?: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header("authorization")

    if (!token) {
        return next(createHttpError(401,"Authentication token is missing"))
    }

    const parseToken = token.split(" ")[1]

    if (!parseToken) {
        return next(createHttpError(401,"Authentication token is missing"))
    }

    const decoded = jwt.verify(parseToken,config.JwtSecrect as string)
    console.log("Decoded Token:", decoded);
    
    const _req = req as AuthenticatedRequest;
    _req.userId = decoded.sub as string;

    next()


}

export default authenticate;