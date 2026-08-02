import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import auhtRouter from "./routes/authRoutes.js";
import restaurantRouter from "./routes/restaurantroutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // Fallback: auto-parse CLOUDINARY_URL if individual vars not set
    ...(process.env.CLOUDINARY_URL && !process.env.CLOUDINARY_CLOUD_NAME
        ? { cloudinary_url: process.env.CLOUDINARY_URL }
        : {}),
});

// Database connection
await connectDB();

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use("/api/auth", auhtRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/admin", adminRouter);


// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Unhandled Error: ", err);
    res.status(500).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack
    });
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default app;