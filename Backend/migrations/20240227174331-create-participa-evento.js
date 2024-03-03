'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('participaeventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

     

      idUsuario: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'usuarios'
          },
          key: 'id'
        },
        allowNull: false,
      },

      idEvento: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'eventos'
          },
          key: 'id'
        },
        allowNull: false,
      },

      fechaParticipacion: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('participaeventos');
  }
};
