'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('familias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      nombre: {
        type: Sequelize.STRING
      },

      desactivado:{
        type:Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('familias');
  }
};