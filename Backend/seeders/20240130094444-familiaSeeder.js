'use strict';
const faFactory = require('../factories/familiaFactory');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const familias = await faFactory(3);
    await queryInterface.bulkInsert('familias', familias, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('familias', null, {});
  }
};
