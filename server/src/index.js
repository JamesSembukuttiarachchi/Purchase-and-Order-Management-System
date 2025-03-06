require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const userRoute = require("./routes/userRoute");
const supplierRoute = require("./routes/supplierRoute");
const logger = require("./config/logger");
const morgan = require("morgan");

const app = express();
app.use(express.json()); // application/json
app.use(morgan("combined", { stream: logger.stream.write })); // Log HTTP requests using morgan

// Routes
app.use("/api/users", userRoute);
app.use("/api/suppliers", supplierRoute);

// Test database connection
sequelize
  .authenticate()
  .then(() => logger.info("Database connected..."))
  .catch((err) => logger.error("Error: " + err));

// Sync models and create tables if they do not exist
sequelize
  .sync({ force: false })
  .then(() => logger.info("Models synced with database!"))
  .catch((err) => logger.error("Error syncing models: " + err));

// Sync the database to apply unique constraints
sequelize
  .sync({ alter: true }) // Use 'alter: true' to update the database schema with changes
  .then(() => {
    logger.info("Database synced with unique constraints.");
  })
  .catch((err) => {
    logger.error("Error syncing database: ", err);
  });

// Root route
app.get("/", (req, res) => {
  logger.info("GET / - Root route hit");
  res.send("Purchase and Order Management System API is running");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
