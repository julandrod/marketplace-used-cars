"use strict";

const { faker } = require("@faker-js/faker");
const { encryptPassword } = require("../../helpers");

faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    const usersPassword = await encryptPassword("123456");

    const admin = {
      id: faker.datatype.uuid(),
      firstName: process.env.ADMIN_NAME,
      lastName: process.env.ADMIN_LASTNAME,
      email: process.env.ADMIN_EMAIL,
      phone: faker.phone.number("3#########"),
      password: usersPassword,
      profileImage:
        "https://pixabay.com/get/g2889731787c91e7a2dce60dbde1ff2485ab286973bd4554a884ec8154252d6f042d0c1e27f97e4dba153976772a2369432f9233ed28f099da3a52e8bddbc1542146d5875912a57eb27f3fbc3d4ff2b59_1280.png",
      roleId: 1,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };

    for (let i=0; i < 30; i++) {
      const createdAt = faker.date.recent();
      const user = {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.helpers.uniqueArray(faker.internet.email, 1)[0],
        phone: faker.helpers.unique(() => faker.phone.number("3#########")),
        password: usersPassword,
        profileImage:
          "https://pixabay.com/get/g2889731787c91e7a2dce60dbde1ff2485ab286973bd4554a884ec8154252d6f042d0c1e27f97e4dba153976772a2369432f9233ed28f099da3a52e8bddbc1542146d5875912a57eb27f3fbc3d4ff2b59_1280.png",
        roleId: 2,
        createdAt,
        updatedAt: createdAt,
      };
      users.push(user);
    }

    await queryInterface.bulkInsert("Users", [...users, admin], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
