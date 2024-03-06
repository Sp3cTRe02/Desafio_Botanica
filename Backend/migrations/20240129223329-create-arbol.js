'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('arboles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },

      id_familia:{
        type: Sequelize.BIGINT,
        references: {
          model:{
            tableName: 'familias'
          },
          key: 'id'
        },
        allowNull: false,
      },

      nombre: {
        type: Sequelize.STRING
      }, 

      ep_floracion:{
        type:Sequelize.STRING
      },

      descripcion:{
        type:Sequelize.STRING
      }, 

      foto:{
        type:Sequelize.STRING,
        defaultValue: null
      },

      desactivado:{
        type:Sequelize.BOOLEAN,
        defaultValue: 0
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('arboles');
  }
};