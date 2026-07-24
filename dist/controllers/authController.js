import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
// Helper to generate a JWT token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};
// Register a new user
// POST /api/auth/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please enter all required fields" });
            return;
        }
        //Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        //Hash password
        const salt = await bcrypt.genSalt(10); // Generate a salt: (nº aleatorio tras 10 vueltas)
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
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
// Aauthenticate a user & get token
// POST /api/auth/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please enter your email and password" });
            return;
        }
        // Check for user
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password || ""); // bcrypt compara el password introducido con el de la BBDD. La pass de bd contiene el salt y lo aplica a las pass ingresada, si el hass generado es idéntico devuelve true
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id.toString())
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
// Get user profile
// GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
    try {
        if (!req.user) { // Si no hay usuario en la request que viene del middleware protect
            res.status(401).json({ message: "Not authorized" }); // denegamos acceso
            return;
        }
        res.json(req.user); // Si si lo hay respondemos con los datos del usuario
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};
