"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate({ User, Car }) {
      this.belongsTo(Car, { foreignKey: "carId" });
      this.belongsTo(User, { as: "seller", foreignKey: "sellerId" });
      this.belongsTo(User, { as: "reviewer", foreignKey: "reviewerId" });
    }
  }
  Review.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sellerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "sellerId",
      },
      reviewerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "reviewerId",
      },
    },
    {
      sequelize,
      modelName: "Review",
      paranoid: true,
    }
  );
  return Review;
};
