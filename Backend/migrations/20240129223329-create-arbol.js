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

      idFamilia:{
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
      },

      nombre: {
        type: Sequelize.STRING
      }, 

      epFloracion:{
        type:Sequelize.STRING
      },

      descripcion:{
        type:Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('arboles');
  }
};