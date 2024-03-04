'use strict';
const ubFactory = require('../factories/ubicacionesFactory');
/**
 * @Jaime_Rafael
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const ubicaciones = await ubFactory(3);
    await queryInterface.bulkInsert('ubicaciones', ubicaciones, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ubicaciones', null, {});
  }
};
