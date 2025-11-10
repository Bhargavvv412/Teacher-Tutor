import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Helper to create JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "teachertutor", {
    expiresIn: "1h",
  });
};

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { username, password, mobile, standard } = req.body;

    if (!username || !password || !mobile || !standard) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      mobile,
      standard,
    });

    res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, username: user.username, standard: user.standard },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username, standard: user.standard },
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update profile
export const updateMe = async (req, res) => {
  try {
    const { mobile, standard } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (mobile) user.mobile = mobile;
    if (standard) user.standard = standard;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        username: user.username,
        mobile: user.mobile,
        standard: user.standard,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};