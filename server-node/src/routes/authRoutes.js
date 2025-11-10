import express from "express";
import { signup, login, getMe, updateMe } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// routes/authRoutes.js
router.get("/me", protect, async (req, res) => {
  res.json(req.user); 
});

// routes/authRoutes.js
router.put("/me", protect, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (username) user.username = username;
    if (password) user.password = password; // will hash if pre-save hook exists

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
export default router;