'use strict';

/**
 * @David_Trujillo
 */


const noticiaFactory = require('../factories/noticiaFactory')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const noticias = await noticiaFactory(4)
    await queryInterface.bulkInsert('contenidos',noticias,{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contenidos', null, {});
  }
};
