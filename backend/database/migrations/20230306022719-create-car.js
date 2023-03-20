"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      transmission: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      doors: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      engineCapacity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      km: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      plate: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM,
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
      },
      fuel: {
        type: Sequelize.ENUM,
        values: [
          "petrol",
          "diesel",
          "gas",
          "micro_hybrid",
          "mild_hybrid",
          "hybrid_electric",
          "electric",
        ],
        allowNull: false,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cars");
  },
};
