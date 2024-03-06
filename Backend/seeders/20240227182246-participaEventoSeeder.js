'use strict';
/**
 * @David_Trujillo
 */

const eventoParticipaFactory = require('../factories/participaEventoFactory')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const participaEventos = await eventoParticipaFactory(4)
    await queryInterface.bulkInsert('participa_eventos',participaEventos,{})
   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('participa_eventos', null, {});
  }
};
