const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");
const { addUser } = require("../controllers/userController");
const { authenticateToken, isAdmin } = require("../middlewares/auth");

// Login route
router.post("/login", login);

// Add user (only admin)
router.post("/users", authenticateToken, isAdmin, addUser);

module.exports = router;
