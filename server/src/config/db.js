require("dotenv").config(); // To load environment variables from .env
const { Sequelize } = require("sequelize");

// Create a Sequelize instance with the PostgreSQL connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
