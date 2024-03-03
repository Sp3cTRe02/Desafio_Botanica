'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizadoreventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idEvento: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'eventos'
          },
          key: 'id'
        },
        primaryKey: true,
        allowNull: false,
      },

      idUsuario: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'usuarios'
          },
          key: 'id'
        },
        primaryKey: true,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('organizadoreventos');
  }
};