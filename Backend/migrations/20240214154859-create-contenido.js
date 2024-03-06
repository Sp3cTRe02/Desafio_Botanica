'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contenidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      id_usuario: {
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

      titulo: {
        type: Sequelize.STRING
      },

      resumen_desc: {
        type: Sequelize.STRING
      },

      descripcion: {
        type: Sequelize.TEXT('medium')
      },
      imagen: {
        type: Sequelize.STRING
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contenidos');
  }
};