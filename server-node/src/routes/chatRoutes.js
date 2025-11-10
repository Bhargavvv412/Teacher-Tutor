import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getMessages, sendMessage } from "../controllers/chatController.js";

const router = express.Router();

router.get("/:receiverId", protect, getMessages);   // fetch chat history
router.post("/", protect, sendMessage);             // send new message

export default router;
