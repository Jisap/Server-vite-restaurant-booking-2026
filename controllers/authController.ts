
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

// Helper to generate a JWT token
export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET! as string, {
    expiresIn: "30d"
  });
}


// Register a new user
// POST /api/auth/register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please enter all required fields" });
      return;
    }

    //Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json({ message: "User already exists" })
      return;
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);                    // Generate a salt: (nº aleatorio tras 10 vueltas)
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password: (password cifrado en base al salt)

    //Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id.toString())
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
      return;
    }


  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Aauthenticate a user & get token
// POST /api/auth/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get user profile
// GET /api/auth/me
// @access Private
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}