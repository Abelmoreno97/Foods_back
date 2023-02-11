const { DataTypes } = require("sequelize");
// Export define model function
// Then inject sequelize connection
module.exports = (sequelize) => {
  // define model
  sequelize.define(
    "Diet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      createdAt: false,
    }
  );
};
