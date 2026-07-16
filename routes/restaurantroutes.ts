import { Router } from "express"
import { protect } from "../middlewares/auth.js";
import { getRestaurants, getFeaturedRestaurants, getRestaurantBySlug, getRestaurantAvailability } from "../controllers/RestaurantController.js";

const restaurantRouter = Router();

restaurantRouter.get("/", getRestaurants)
restaurantRouter.get("/featured", getFeaturedRestaurants)
restaurantRouter.get("/:slug", getRestaurantBySlug)
restaurantRouter.get("/:id/availability", getRestaurantAvailability)




export default restaurantRouter;