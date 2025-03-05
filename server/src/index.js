const express = require("express"); // Import express
const client = require("./config/db"); // Import PostgreSQL client from db.js
require("dotenv").config(); // Load environment variables

// Create an Express application
const app = express();

// Define a port to listen on
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Example route to test database connection
app.get("/test-db", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()"); // Test query to check if database is connected
    res.status(200).json({
      success: true,
      message: "Database is connected",
      currentTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error connecting to the database",
      error: error.message,
    });
  }
});

// Default route to check server status
app.get("/", (req, res) => {
  res.send("Hello, the server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
