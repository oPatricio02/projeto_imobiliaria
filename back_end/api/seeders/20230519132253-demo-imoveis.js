'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('imoveis', [
      {
        proprietario_id: 1,
        endereco_id: 1,
        fotos_id: 1,
        descricao: 'Casa de alto padrão',
        ativo: '1',
        tipo: 'Casa',
        valor: 250000.00,
        valor_minimo: 235000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        proprietario_id: 2,
        endereco_id: 2,
        fotos_id: 2,
        descricao: 'Apartamento com 2 quartos padrão',
        ativo: '1',
        tipo: 'Apartamento',
        valor: 300000.00,
        valor_minimo: 290000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        proprietario_id: 2,
        endereco_id: 3,
        fotos_id: 3,
        descricao: 'Apartamento com 2 quartos padrão',
        ativo: '1',
        tipo: 'Apartamento',
        valor: 400000.00,
        valor_minimo: 390000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('imoveis', null, {});
  }
};
