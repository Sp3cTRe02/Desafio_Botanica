'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rolUsuario', {
      idRol: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      idUsuario: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rolUsuario');
  }
};