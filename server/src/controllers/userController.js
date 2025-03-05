const User = require("../models/User");

// Controller for adding a new user (admin-only)
const addUser = async (req, res) => {
  try {
    const { username } = req.body;
    logger.info(`Adding new user with username: ${username}`);
    const user = await User.create({ username });
    logger.info(`User created successfully: ${JSON.stringify(user)}`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

module.exports = { addUser };
