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

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        user.password = hashedPassword;

        user.dataValues.password = randomPassword;

        console.log(
          `Generated and hashed password for user ${user.username}: ${randomPassword}`
        );
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          // Hash the password before saving it
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

module.exports = User;
