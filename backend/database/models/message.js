"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, Car }) {
      this.belongsTo(User, { foreignKey: "senderId" });
      this.belongsTo(Car, { foreignKey: "carId" });
    }
  }
  Message.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      paranoid: true,
    }
  );
  return Message;
};
