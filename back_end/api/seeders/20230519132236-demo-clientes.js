'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [
    {
      pessoa_id: 1,
      tipo_cli: 'proprietario',
      ativo: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      pessoa_id: 2,
      tipo_cli: 'proprietario',
      ativo: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
