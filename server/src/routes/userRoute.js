const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const {
  addUser,
  updatePassword,
  getAllUsers,
} = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middlewares/auth");

// Login route
router.post("/login", login);

// Add user (only admin)
router.post("/adduser", authenticateToken, isAdmin, addUser);
//router.post("/adduser", addUser);

// Update password (for logged-in user)
router.put("/updatepassword", authenticateToken, updatePassword);

// Get all users (only admin)
router.get("/", authenticateToken, isAdmin, getAllUsers);

module.exports = router;
