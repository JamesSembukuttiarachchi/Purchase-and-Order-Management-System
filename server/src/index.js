require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const userRoute = require("./routes/userRoute");
const supplierRoute = require("./routes/supplierRoute");
const User = require("./models/User");
const Supplier = require("./models/Supplier");
const logger = require("./config/logger");
const morgan = require("morgan");

const app = express();
app.use(express.json()); // application/json
app.use(morgan("combined", { stream: logger.stream.write })); // Log HTTP requests using morgan

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

// Routes
app.use("/api/users", userRoute);
app.use("/api/suppliers", supplierRoute);

// Root route
app.get("/", (req, res) => {
  logger.info("GET / - Root route hit");
  res.send("Purchase and Order Management System API is running");
});

// // Create a user route (Example)
// app.post("/users", async (req, res) => {
//   logger.info("POST /users - Create user route hit");
//   try {
//     const { username } = req.body;
//     const user = await User.create({ username });
//     logger.info(`User created: ${JSON.stringify(user)}`);
//     res.json(user);
//   } catch (error) {
//     logger.error(`Error creating user: ${error.message}`);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Create a supplier route (Example)
// app.post("/suppliers", async (req, res) => {
//   logger.info("POST /suppliers - Create supplier route hit");
//   try {
//     const { supplierName, telephone, email, contactPerson, notes } = req.body;
//     const supplier = await Supplier.create({
//       supplierName,
//       telephone,
//       email,
//       contactPerson,
//       notes,
//     });
//     logger.info(`Supplier created: ${JSON.stringify(supplier)}`);
//     res.json(supplier);
//   } catch (error) {
//     logger.error(`Error creating supplier: ${error.message}`);
//     res.status(500).json({ error: error.message });
//   }
// });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
