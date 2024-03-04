'use strict';
const fotFactory = require('../factories/fotoFactory');
/**
 * @Jaime_Rafael
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const fotos = await fotFactory(3);
    await queryInterface.bulkInsert('fotos', fotos, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos', null, {});
  }
};
