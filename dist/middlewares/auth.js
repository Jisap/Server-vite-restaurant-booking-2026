import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extraemos el token de los headers
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el token y lo usamos como un id
            const user = await User.findById(decoded.id).select('-password'); // Buscamos el usuario y excluimos el password
            if (!user) {
                res.status(401).json({ message: "Not authorized, user not found" });
                return;
            }
            req.user = user; // Añadimos el user al request para usarlo en los controladores
            next();
        }
        catch (error) {
            console.log("Auth Middleware Error:", error);
            res.status(401).json({ message: "Not Authorized, token failed." });
            return;
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, No token" });
        return;
    }
};
export const adminOnly = (req, res, next) => {
    if (req.user && req.user?.role === "admin") {
        next();
    }
    else {
        res.status(403).json({ message: "Access denied, admin role required" });
        return;
    }
};
export const ownerOnly = (req, res, next) => {
    if (req.user && req.user?.role === "owner" || req.user?.role === "admin") {
        next();
    }
    else {
        res.status(403).json({ message: "Access denied, admin or owner role required" });
        return;
    }
};
