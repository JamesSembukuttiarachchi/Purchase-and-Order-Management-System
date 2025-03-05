const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admins can perform this action" });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
