import { Request, Response } from "express";


// Get all restaurants with search and filters
// GET /api/restaurants
export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get featured and exclusive restaurants 
// GET /api/restaurants/featured
export const getFeaturedRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get single restaurant by slug 
// GET /api/restaurants/:slug
export const getdRestaurantBySlug = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get dynamic seat availability for slots
// GET /api/restaurants/:id/availability
export const getRestaurantAvailability = async (req: Request, res: Response): Promise<void> => {
    try {

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}