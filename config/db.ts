import mongoose from "mongoose";
import dns from "node:dns";

// Fuerza a Node a usar DNS de Google/Cloudflare para resolver el SRV
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectDB;