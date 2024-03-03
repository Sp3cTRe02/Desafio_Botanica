'use strict';
const eventoOrganizadorFactory = require('../factories/organizadorEventoFactory')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const organizadorEventos = await eventoOrganizadorFactory(4)
    await queryInterface.bulkInsert('organizadoreventos',organizadorEventos,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('organizadoreventos', null, {});
  }
};
