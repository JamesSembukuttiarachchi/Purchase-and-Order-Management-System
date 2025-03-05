const User = require("./User");
const Supplier = require("./Supplier");
const PasswordReset = require("./PasswordReset");

// Define associations
User.hasMany(PasswordReset, { foreignKey: "userId" });
PasswordReset.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  User,
  Supplier,
  PasswordReset,
};
