'use strict';
/**
 * @David_Trujillo
 */


const contenidoAuxiliarFactory = require('../factories/contenidoAuxiliarFactory')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const contenidoAuxiliar = await contenidoAuxiliarFactory(2)
   await queryInterface.bulkInsert('contenidoauxiliar',contenidoAuxiliar,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('contenidoauxiliar',null,{})
  }
};
