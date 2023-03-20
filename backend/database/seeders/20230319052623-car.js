"use strict";

const { faker } = require("@faker-js/faker");
const { User } = require("../models");

faker.setLocale("es");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ attributes: ["id"] });
    const userIds = users.map((user) => user.id);
    const cars = [];

    for (let i = 0; i < 100; i++) {
      const createdAt = faker.date.recent();
      const car = {
        id: faker.datatype.uuid(),
        sellerId: faker.helpers.arrayElement(userIds),
        year: faker.date
          .between("1900-01-01T00:00:00.000Z", "2022-01-01T00:00:00.000Z")
          .getFullYear(),
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        color: faker.vehicle.color(),
        transmission: faker.helpers.arrayElement(["automatic", "mechanic"]),
        doors: faker.datatype.number({ min: 2, max: 8 }),
        engineCapacity: faker.helpers.arrayElement([
          "5.0 L",
          "10.0 L",
          "12.0 L",
          "15.0 L",
          "20.0 L",
        ]),
        km: faker.datatype.number({ min: 10, max: 120000 }),
        plate: faker.helpers.unique(() => faker.datatype.number({ min: 0, max: 999 })),
        city: faker.address.cityName(),
        // precio en dolares
        price: faker.datatype.number({ min: 1000, max: 100000 }),
        description: faker.lorem.paragraphs(3),
        type: faker.helpers.arrayElement([
          "sedan",
          "suv",
          "hatchback",
          "crossover",
          "coupe",
          "pick_up",
          "roadster",
          "minivan",
        ]),
        fuel: faker.helpers.arrayElement([
          "petrol",
          "diesel",
          "gas",
          "micro_hybrid",
          "mild_hybrid",
          "hybrid_electric",
          "electric",
        ]),
        images: faker.helpers.arrayElements(
          [
            "https://picolio.auto123.com/auto123-media/articles/2020/12/67715/Toyota-GR-Supra-30-2021%20(17)fr.jpg?crop=0,682,2998,999&amp;scaledown=1024",
            "https://rodaticarros.com.co/images/listings/2022-09/0699d892-1662034945-957.jpg",
            "https://fotos.estaticosmf.com/fotos_jato/E/400/OPEL/CORSA/2002/5HA.JPG",
            "https://img.remediosdigitales.com/bd4c67/mitsubishi-lancer-evo-x-final-edition/1366_2000.jpg",
            "https://www.elcarrocolombiano.com/wp-content/uploads/2019/04/20190423-TOYOTA-HILUX-SPECIAL-EDITION-2019-01.jpg",
            "https://img.clasf.co/2020/07/04/Renault-Logan-Expression-1-6-2013-Gris-Estrella-Sedan-Rines-20200704010100.9239270015.jpg",
            "https://i.ytimg.com/vi/jgovxK1f_0s/maxresdefault.jpg",
            "https://i.pinimg.com/originals/1c/05/80/1c0580c8abc3a133e5901961194bbf63.jpg",
            "https://http2.mlstatic.com/D_NQ_NP_832734-MCO53430939251_012023-W.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Peugeot_206_Quicksilver_90.jpg/1200px-Peugeot_206_Quicksilver_90.jpg",
            "https://prod.pictures.autoscout24.net/listing-images/ffff4463-9f23-4666-8cdd-6174a19a441d_d7da58eb-d3c2-45cf-b532-b276071e7884.jpg/250x188.webp",
            "https://picolio.auto123.com/auto123-media/articles/2020/12/67715/Toyota-GR-Supra-30-2021%20(17)fr.jpg?crop=0,682,2998,999&amp;scaledown=1024",
          ],
          3
        ),
        createdAt,
        updatedAt: createdAt,
      };
      cars.push(car);
    }

    await queryInterface.bulkInsert("Cars", [...cars], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
