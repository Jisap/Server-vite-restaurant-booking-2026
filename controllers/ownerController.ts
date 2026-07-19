import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant.js";
import { AuthRequest } from "../middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary"



// Helper function to upload
const uploadToCloudinary = (fileBuffer: Buffer): Promise<{ secure_url: string }> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'restaurant_images' },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"))
        resolve({ secure_url: result.secure_url })
      }
    )

    stream.end(fileBuffer);
  })
}


// Get owner's restaurant
// Get /api/owner/restaurant
export const getOwnerRestaurant = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user?._id,
    }).populate('owner', 'name email');

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

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
    const existing = await Restaurant.findOne({
      owner: req.user?._id,
    });

    if (existing) {
      res.status(400).json({ message: "Restaurant already exists" });
      return;
    }

    const { name, description, cuisine, priceRange, location, address, chef, tags, availableSlots, totalSeats } = req.body;

    if (!name || !location || !description || !cuisine || !priceRange || !address || !chef || !tags || !availableSlots || !totalSeats) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Generate slug from name
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const slugExists = await Restaurant.findOne({
      slug,
    });

    if (slugExists) {
      res.status(400).json({ message: "Restaurant with this name already exists" });
      return;
    }

    // Handle image
    let imageUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    // Setup parsed tags and slots
    const parsedTags = typeof tags === "string"
      ? tags.split(",").map((t) => t.trim())
      : tags || [];

    const parsedSlots = typeof availableSlots === "string"
      ? availableSlots.split(",").map((s) => s.trim())
      : availableSlots || ["17:00", "18:00", "19:00", "20:00", "21:00"];

    const restaurant = await Restaurant.create({
      name,
      slug,
      description,
      cuisine,
      priceRange,
      location,
      address,
      chef,
      image: imageUrl,
      tags: parsedTags,
      availableSlots: parsedSlots,
      totalSeats: totalSeats ? Number(totalSeats) : 20,
      owner: req.user?._id,
      status: 'pending',
    });

    res.status(201).json(restaurant);

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
