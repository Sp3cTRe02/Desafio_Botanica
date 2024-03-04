'use strict';
/**
 * @David_Trujillo
 */

const eventoParticipaFactory = require('../factories/participaEventoFactory')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const participaEventos = await eventoParticipaFactory(4)
    await queryInterface.bulkInsert('participaeventos',participaEventos,{})
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('participaeventos', null, {});
  }
};
