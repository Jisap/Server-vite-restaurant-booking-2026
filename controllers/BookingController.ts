

// Create a new booking
// POST /api/bookings
// @access Private

import { Request, Response } from "express"
import { AuthRequest } from "../middlewares/auth.js"
import { Restaurant } from "../models/Restaurant.js";
import { Booking } from "../models/Booking.js";

export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { restaurantId, date, time, guests, occasion, specialRequests } = req.body;
        if (!restaurantId || !date || !time || !guests) {
            res.status(400).json({ message: "Please provide all required reservation details" })
            return
        }

        // Check if restaurant exists
        const restaurant = await Restaurant.findById(restaurantId)
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant not found" })
            return
        }

        // Verify restaurant is approved
        if (restaurant.status !== "approved") {
            res.status(400).json({ message: "Reservation are not open for this restaurant yet." })
            return
        }

        // Verify seat availability
        const requestedGuests = Number(guests);
        const existingBookings = await Booking.find({
            restaurant: restaurantId,
            date: new Date(date),
            time: time,
            status: "confirmed"
        });

        const bookedSeats = existingBookings.reduce((sum, b) => sum + b.guests, 0); // Total de sitios que han sido reservados a la misma hora
        const totalSeats = restaurant.totalSeats || 20;
        const availableSeats = totalSeats - bookedSeats;

        if (requestedGuests > availableSeats) {
            res.status(400).json({
                message: `Sorry, only ${availableSeats} seats are available at this time.`
            });
            return;
        }

        const booking = await Booking.create({
            restaurant: restaurantId,
            user: req.user?._id,
            date: new Date(date),
            time,
            guests: Number(guests),
            occasion,
            specialRequests,
            status: "confirmed"
        });

        // Populate restaurant info before returning
        const populatedBooking = await booking.populate("restaurant", "name location image address"); // Seleccionamos los campos que queremos que se muestren en el frontend

        res.status(201).json({
            message: "Reservation created successfully",
            booking: populatedBooking // Mostramos el restaurante con todos los datos
        });

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
        const bookings = await Booking.find({ user: req.user?._id })
            .populate("restaurant", "name location image address")
            .sort({ date: -1, time: -1 }); // Ordenamos por fecha de creación (más recientes primero)

        res.status(200).json(bookings);
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