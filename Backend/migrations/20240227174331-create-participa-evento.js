'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('participa_eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },

     

      id_usuario: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'usuarios'
          },
          key: 'id'
        },
        allowNull: false,
      },

      id_evento: {
        type: Sequelize.BIGINT,
        references: {
          model: {
            tableName: 'eventos'
          },
          key: 'id'
        },
        allowNull: false,
      },

      fecha_participacion: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('participa_eventos');
  }
};
