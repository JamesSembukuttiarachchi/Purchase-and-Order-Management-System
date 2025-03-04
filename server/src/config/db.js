const { Client } = require("pg");
require("dotenv").config(); // Load environment variables

// Create a new instance of the Client
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the PostgreSQL database
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL Database"))
  .catch((err) => console.error("Connection error", err.stack));

// Export client to use in other files
module.exports = client;
