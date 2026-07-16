import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant.js";


// Get all restaurants with search and filters
// GET /api/restaurants
export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, priceRange, rating, location, sort } = req.query;     // Toma los parámetros de la url

    const queryObject: any = { status: "approved" }                         // se crea un objeto vacío con una condición inicial.

    if (search) {                                                          // Si existe el parámetro search
      queryObject.$or = [                                                 // Se crea un array de condiciones ($or). Cada objeto del array representa una consulta independiente.
        { name: { $regex: search, $options: "i" } },                       // MongoDB devolverá el restaurante si el texto buscado aparece en nombre, la cocina o la ubicación
        { cuisine: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ]
    }

    if (priceRange) {                                                          // priceRange puede llegar como un único valor ("$$")
      const prices = Array.isArray(priceRange)                               // o como un array (["$", "$$"]) si el usuario selecciona varios.
        ? priceRange                                                         // Nos aseguramos de trabajar siempre con un array.
        : [priceRange]
      queryObject.priceRange = { $in: prices }                               // $in devuelve los documentos cuyo priceRange 
    }                                                                        // coincida con cualquiera de los valores del array.

    if (rating) {                                                             // $gte (Greater Than or Equal) devuelve los documentos
      queryObject.rating = { $gte: parseFloat(rating as string) }            // cuyo valor sea mayor o igual que el indicado  
    }                                                                        // parseFloat() convierte el valor de rating a número 
    // para que pueda ser comparado con el rating del documento.

    if (location) {                                                           // Busca coincidencias parciales en el campo location.
      queryObject.location = { $regex: location as string, $options: "i" }   // $options: "i" hace que la búsqueda no distinga entre mayúsculas y minúsculas.
    }

    // Sorting
    // Por defecto, los restaurantes se ordenan por fecha de creación (más recientes primero).
    let sortOption: any = { createdAt: -1 };

    if (sort === "rating") {
      sortOption = { rating: -1 };             // Ordenar por valoración de mayor a menor.
    } else if (sort === "price_low") {
      sortOption = { priceRange: 1 };          // Ordenar por precio de menor a mayor.
    } else if (sort === "price_high") {
      sortOption = { priceRange: -1 };         // Ordenar por precio de mayor a menor.
    }

    // En MongoDB:
    //   1  -> orden ascendente
    //  -1  -> orden descendente

    const restaurant = await Restaurant.find(queryObject).sort(sortOption)
    res.json(restaurant);

  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Get featured and exclusive restaurants 
// GET /api/restaurants/featured
export const getFeaturedRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const featured = await Restaurant.find({
      status: "approved",
      $or: [{ featured: true }, { exclusive: true }]
    }).limit(6);

    res.json(featured);
  } catch (error: any) {
    console.log("Get Featured Restaurant Error", error);
    res.status(500).json({ message: "Server error" });
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