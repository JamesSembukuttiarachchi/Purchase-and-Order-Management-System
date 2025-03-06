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
      allowNull: true, // Allow null initially, as password will be set before creation
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
        // Generate a random plain password
        const randomPassword = crypto.randomBytes(8).toString("hex");

        user.password = randomPassword;

        user.dataValues.password = randomPassword; // This is the plain password

        console.log(
          `Generated password for user ${user.username}: ${randomPassword}`
        );
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = user.password;
        }
      },
    },
  }
);

module.exports = User;
