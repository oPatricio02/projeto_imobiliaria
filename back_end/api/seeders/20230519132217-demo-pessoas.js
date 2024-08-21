'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pessoas', [
      {
        endereco_id: 1,
        nome: 'Ademir Ademar',
        cnpj_cpf: '48843094807',
        telefone: '',
        email: 'admin@gmail.com',
        rg_ie: '52402369-5',
        dta_nasc: new Date("1995-02-20"),
        sexo: 'M',
        celular: '18995207891',
        usuario: 'admin',
        hash: '$2a$04$I43AdxzfR5fg3a/KJZgioewbiWUXJLSHWypQ7BS.DdtzcrDZIMT8K',
        dta_encerramento: null,
        nivel_acesso: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        endereco_id: 2,
        nome: 'Corretor da Silva',
        cnpj_cpf: '13529183822',
        telefone: '',
        email: 'corretor@gmail.com',
        rg_ie: '52204369-5',
        dta_nasc: new Date("1985-05-10"),
        sexo: 'F',
        celular: '18997208791',
        usuario: 'corretor',
        hash: '$2a$04$PkqGw6Ibqm7zi9/XXxjRMOAVE/m16llGcD01pXmsl7WAEANa7Q1La',
        dta_encerramento: null,
        nivel_acesso: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        endereco_id: 3,
        nome: 'Teste da Silva',
        cnpj_cpf: '48843094807',
        telefone: '',
        email: 'teste@gmail.com',
        rg_ie: '52402369-5',
        dta_nasc: new Date("1995-02-20"),
        sexo: 'M',
        celular: '18995207891',
        usuario: 'teste',
        hash: '$2a$04$EcZK/F1UlhTI60fZ.pXEXOpQoKpSpoqYsHZYdJC/pgXCflcAvEfaK',
        dta_encerramento: null,
        nivel_acesso: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pessoas', null, {});
  }
};
