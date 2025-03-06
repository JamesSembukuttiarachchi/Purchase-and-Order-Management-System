const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sequelize = require("../config/db");

class User extends Model {}

// Define the User model
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "staff",
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
        // Generate random password
        const randomPassword = crypto.randomBytes(8).toString("hex");

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        // Set the password field to the hashed password
        user.password = hashedPassword;

        // Add plain password to dataValues temporarily for response
        user.dataValues.password = randomPassword; // Return plain password for user to copy
        console.log(
          `Generated password for user ${user.username}: ${randomPassword}`
        );
      },
    },
  }
);

module.exports = User;
