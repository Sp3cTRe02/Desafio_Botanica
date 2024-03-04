'use strict';
/**
 * @Jaime_Rafael
 */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        nombre: 'organizador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
