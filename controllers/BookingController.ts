

// Create a new booking
// POST /api/bookings
// @access Private

import { Request, Response } from "express"
import { AuthRequest } from "../middlewares/auth.js"

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    }
    catch (error: any) {
        console.log("Create Booking Error", error)
        res.status(500).json({ message: error.message })
    }
}

// Get logger in user bookings
// POST /api/bookings/my
// @access Private
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    }
    catch (error: any) {
        console.log("Create Booking Error", error)
        res.status(500).json({ message: error.message })
    }
}

// Cancel a booking
// PUT /api/bookings/:id/cancel
// @access Private
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

    }
    catch (error: any) {
        console.log("Create Booking Error", error)
        res.status(500).json({ message: error.message })
    }
}