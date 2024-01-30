'use strict';
const arFactory = require('../factories/arbolFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const arboles = await arFactory(3);
    await queryInterface.bulkInsert('arboles', arboles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('arboles', null, {});
  }
};
