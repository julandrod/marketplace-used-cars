"use strict";

const { faker } = require("@faker-js/faker");
const { User, Car } = require("../models");

faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ attributes: ["id"] });
    const userIds = users.map((user) => user.id);
    const cars = await Car.findAll({ attributes: ["id"] });
    const carIds = cars.map((car) => car.id);
    const messages = [];

    for (let i = 0; i < 30; i++) {
      const createdAt = faker.date.recent();
      const message = {
        id: faker.datatype.uuid(),
        message: faker.lorem.sentences(2),
        senderId: faker.helpers.arrayElement(userIds),
        carId: faker.helpers.arrayElement(carIds),
        createdAt,
        updatedAt: createdAt,
      };
      messages.push(message);
    }

    await queryInterface.bulkInsert("Messages", [...messages], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Messages", null, {});
  },
};
