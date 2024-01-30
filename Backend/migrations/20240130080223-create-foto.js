'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      idArbol: {
        type: Sequelize.BIGINT,
        references: {
          model:{
            tableName: 'arboles'
          },
          key: 'id'
        },
        primaryKey: true,
        allowNull: false,
      },
      ruta: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fotos');
  }
};