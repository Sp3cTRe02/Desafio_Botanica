'use strict';
/**
 * @David_Trujillo
 */


const eventoFactory = require('../factories/eventoFactory')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const eventos = await eventoFactory(4)
    await queryInterface.bulkInsert('eventos',eventos,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('eventos', null, {});
  }
};
