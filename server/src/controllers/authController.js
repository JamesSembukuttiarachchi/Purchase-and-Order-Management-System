const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const logger = require("../config/logger");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      logger.warn(`Login attempt for non-existent user: ${username}`);
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      logger.warn(`Invalid password attempt for user: ${username}`);
      return res.status(403).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`User logged in successfully: ${username}`);
    res.json({ token });
  } catch (err) {
    logger.error(`Error logging in: ${err.message}`);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

module.exports = { login };
