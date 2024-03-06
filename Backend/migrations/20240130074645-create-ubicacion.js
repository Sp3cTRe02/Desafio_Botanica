'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ubicaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_arbol: {
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
      latitud: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitud: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ciudad:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ubicaciones');
  }
};