import { NextFunction, Request, Response } from "express"
import { IUser, User } from "../models/User.js"
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];                                  // Extraemos el token de los headers
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }      // Verificamos el token y lo usamos como un id
      const user = await User.findById(decoded.id).select('-password')                  // Buscamos el usuario y excluimos el password
      if (!user) {
        res.status(401).json({ message: "Not authorized, user not found" });
        return;
      }

      req.user = user;
      next();

    } catch (error: any) {
      console.log("Auth Middleware Error:", error)
      res.status(401).json({ message: "Not Authorized, token failed." });
      return;
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, No token" });
    return;
  }
}

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin role required" });
    return;
  }
}

export const ownerOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user?.role === "owner" || req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin or owner role required" });
    return;
  }
}

