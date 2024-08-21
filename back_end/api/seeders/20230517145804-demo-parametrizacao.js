'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Parametrizacoes', [
        {
          endereco_id: '1',
          nome: 'Cantinho do Doce',
          cnpj: '72.641.855/0001-02',
          razao_social: 'Antonia Valdeni da Silva',
          nome_fantasia: 'Antonia',
          is: '232.024.500.883',
          site: 'https://www.ateliecantinhodoce.com.br/',
          logo_grande: 'https://1drv.ms/i/s!AtdIvntR65P9gcQSFytaAAtV7gwoPA?e=SK2bI4',
          logo_pequeno: 'https://1drv.ms/i/s!AtdIvntR65P9gcQTgBbJwP_LJPWfSw?e=iELqpQ',
          telefone: '18997411339',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Parametrizacoes', null, {});
  }
};
