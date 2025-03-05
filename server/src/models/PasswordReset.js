const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class PasswordReset extends Model {}

// Define the Password Reset model
PasswordReset.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PasswordReset",
  }
);

module.exports = PasswordReset;
