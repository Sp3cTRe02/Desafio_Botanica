'use strict';
const usFactory = require('../factories/userFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await usFactory(3);
    await queryInterface.bulkInsert('usuarios', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
