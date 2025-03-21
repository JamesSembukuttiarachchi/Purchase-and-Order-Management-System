const User = require("../models/User");
const logger = require("../config/logger");

// Controller for adding a new user (admin-only)
const addUser = async (req, res) => {
  try {
    const { username, role } = req.body;

    const userRole = role || "staff";

    logger.info(
      `Adding new user with username: ${username} and role: ${userRole}`
    );

    const user = await User.create({ username, role: userRole });

    logger.info(`User created successfully: ${JSON.stringify(user)}`);

    res.status(201).json({
      id: user.id,
      username: user.username,
      role: user.role,
      password: user.dataValues.password,
    });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll({
      attributes: ["id", "username", "role", "createdAt"],
    });

    // Check if users exist
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Error retrieving users: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

// Controller to update the password of the logged-in user
const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Find the user by ID
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's password with the plain password
    user.password = password;

    // Save the updated user
    await user.save();

    logger.info(`Password updated for user ${user.username}`);

    res.status(200).json({
      message: "Password updated successfully",
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    logger.error(`Error updating password: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error updating password", error: error.message });
  }
};

module.exports = { addUser, updatePassword, getAllUsers };
