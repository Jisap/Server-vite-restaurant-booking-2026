import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant.js";
import { AuthRequest } from "../middlewares/auth.js";



// Get owner's restaurant

// Get /api/owner/restaurant
export const getOwnerRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const restaurant = await Restaurant.findOne({
            owner: req.user?._id,
        }).populate('owner', 'name email');
        res.json(restaurant);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Create owner's restaurant (submitted to pending)
// POST /api/owner/restaurant
export const createOwnerRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update owner's restaurant (submitted to pending)
// PUT /api/owner/restaurant/:id
export const updateOwnerRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get bookings for owner's restaurant
// GET /api/owner/bookings
export const getOwnerBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update status of a booking 
// PUT /api/owner/bookings/:id/status
export const updateBookingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
