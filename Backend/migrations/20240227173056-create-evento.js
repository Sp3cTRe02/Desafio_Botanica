'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
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

      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.TEXT('medium')
      },
      fechaInicio: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      cantidadMax: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      latitud: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      longitud: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ubicacion:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      imagen:{
        type: Sequelize.STRING,
        allowNull: false,
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('eventos');
  }
};