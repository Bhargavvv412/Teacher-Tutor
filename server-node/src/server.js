import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
// import { queryGeminiRAG } from "./services/ragService.js";
import profileRoutes from "./routes/profileRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// ✅ Enable CORS
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Connect DB
connectDB();

// Routes
app.use("/auth", authRoutes);
// app.use("/chat", chatRoutes);
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
