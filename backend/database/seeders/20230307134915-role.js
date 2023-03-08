"use strict";

const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 1,
          name: "admin",
          description: "usuario con privilegios de administrador",
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        },
        {
          id: 2,
          name: "standar",
          description: "usuario con privilegios estandar",
          createdAt: faker.date.recent(),
          updatedAt: faker.date.recent(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
