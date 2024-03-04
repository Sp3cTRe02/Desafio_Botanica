'use strict';
const rolUsuarioFactory = require('../factories/rolUsuarioFactory');
/**
 * @Jaime_Rafael
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rolUsuario = await rolUsuarioFactory(3);
    await queryInterface.bulkInsert('rolusuario', rolUsuario, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rolUsuario', null, {});
  }
};
