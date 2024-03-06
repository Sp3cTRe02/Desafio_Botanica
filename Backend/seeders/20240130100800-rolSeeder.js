'use strict';
/**
 * @Jaime_Rafael
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'admin'
      },
      {
        nombre: 'cliente'
      },

      {
        nombre: 'organizador'
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
