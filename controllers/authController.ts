
import { Request, Response } from "express";


// Register a new user
// POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Aauthenticate a user & get token
// POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get user profile
// GET /api/auth/me
// @access Private
export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}