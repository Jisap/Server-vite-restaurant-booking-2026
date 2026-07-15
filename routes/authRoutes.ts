import { Router } from "express"
import { getMe, loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const auhtRouter = Router();

auhtRouter.post("/register", registerUser)
auhtRouter.post("/login", loginUser)
auhtRouter.get("/me", protect, getMe)

export default auhtRouter;