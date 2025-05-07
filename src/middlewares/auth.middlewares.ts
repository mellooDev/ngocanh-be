import { NextFunction, Request, Response } from "express";
import { authConfig } from "../config/config";
import jwt from 'jsonwebtoken'

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        try {
            const decoded = jwt.verify(token, authConfig.jwtSecret);
            (req as any).user = decoded;
            next();
        } catch (error) {
            return res.status(403).json({ message: 'Invalid token' });
        }
};
