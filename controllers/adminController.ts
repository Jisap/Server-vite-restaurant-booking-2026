


import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.js";




// Get all restaurants for admin management
// GET /api/admin/restaurants
export const getAllRestaurants = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

// Approve/reject a restaurant profile
// PUT  /api/admin/restaurants/:id/approve
export const approveRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}