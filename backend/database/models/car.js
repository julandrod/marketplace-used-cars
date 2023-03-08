"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate({ User, Message, Review }) {
      this.belongsTo(User, { foreignKey: "sellerId" });
      this.hasMany(Message, { foreignKey: "carId" });
      this.hasMany(Review, { foreignKey: "carId" });
    }
  }
  Car.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transmission: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doors: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      engineCapacity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      km: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lastPlate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM({
          values: [
            "sedan",
            "suv",
            "hatchback",
            "crossover",
            "coupe",
            "pick_up",
            "roadster",
            "minivan",
          ],
        }),
        allowNull: false,
      },
      fuel: {
        type: DataTypes.ENUM({
          values: [
            "petrol",
            "diesel",
            "gas",
            "micro_hybrid",
            "mild_hybrid",
            "hybrid_electric",
            "electric",
          ],
        }),
        allowNull: false,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
    }
  );
  return Car;
};
