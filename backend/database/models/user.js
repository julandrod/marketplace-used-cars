"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Car, Message, Review, Role }) {
      this.belongsTo(Role, { foreignKey: "roleId" });
      this.hasMany(Car, { foreignKey: "sellerId" });
      this.hasMany(Message, { foreignKey: "senderId" });
      this.hasMany(Review, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profileImage: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/leo-echenique/image/upload/v1668038867/wkvuim8xw0x9oez57ut5.svg",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verificationToken: {
        type: DataTypes.STRING,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
