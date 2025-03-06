const User = require("../models/User");
const logger = require("../config/logger");

// Controller for adding a new user (admin-only)
const addUser = async (req, res) => {
  try {
    const { username, role } = req.body; // Accept role from request body

    // If role is provided, use it; otherwise, default to "staff"
    const userRole = role || "staff";

    logger.info(
      `Adding new user with username: ${username} and role: ${userRole}`
    );

    // Create a new user with the provided role
    const user = await User.create({ username, role: userRole });

    logger.info(`User created successfully: ${JSON.stringify(user)}`);

    // Return the user along with the generated password (for copying to clipboard)
    res.status(201).json({
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.password, // Send the plain password for copying
    });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

module.exports = { addUser };
