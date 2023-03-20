"use strict";

const { faker } = require("@faker-js/faker");
const { User, Car } = require("../models");

faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // const users = await User.findAll({ attributes: ["id"] });
    // const userIds = users.map((user) => user.id);
    // const cars = await Car.findAll({ attributes: ["id", "sellerId"] });
    // const carAndSellerIds = cars.map((car) => car.dataValues);
    const cars = await Car.findAll();
    const reviews = [];

    for (let car of cars) {
      for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
        const createdAt = faker.date.recent();
        const carId = car.id;
        const sellerId = car.sellerId;
        const userIds = cars
          .map((car) => car.sellerId)
          .filter((item) => item !== sellerId);
        const review = {
          id: faker.datatype.uuid(),
          rating: faker.datatype.number({ min: 1, max: 5 }),
          title: faker.lorem.sentence(3),
          comment: faker.lorem.sentences(2),
          sellerId,
          carId,
          reviewerId: faker.helpers.arrayElement(userIds),
          createdAt,
          updatedAt: createdAt,
        };
        reviews.push(review);
      }
    }

    await queryInterface.bulkInsert("Reviews", [...reviews], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
  },
};
