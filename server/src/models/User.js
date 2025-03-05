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
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "staff", // Can be 'admin' or 'staff'
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: async (user) => {
        // Generate random password
        const randomPassword = crypto.randomBytes(8).toString("hex");
        user.password = await bcrypt.hash(randomPassword, 10); // Hash the password
        console.log(
          `Generated password for user ${user.username}: ${randomPassword}`
        );
      },
    },
  }
);

module.exports = User;
