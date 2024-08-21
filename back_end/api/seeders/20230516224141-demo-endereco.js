'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('enderecos', [
      {
        logradouro: "340-3516 Convallis Avenue",
        bairro: "Vuokhull",
        cep: "1570016",
        numero: 5428,
        complemento: "ut mi. Duis risus odio, auctor vitae,",
        cidade: "Åkrehamn",
        uf: "Westmorland",
        ativo: "0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "628-4341 Nunc Rd.",
        bairro: "Zoxlas",
        cep: "4319656",
        numero: 7243,
        complemento: "sed",
        cidade: "North-Eastern Islands",
        uf: "Nordrhein-Westphalen",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "Ap #761-2680 Dapibus Rd.",
        bairro: "Alesas",
        cep: "37749130",
        numero: 8027,
        complemento: "venenatis a, magna. Lorem ipsum",
        cidade: "Novomoskovsk",
        uf: "Kogi",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "630-1465 Quisque Rd.",
        bairro: "Esatin",
        cep: "795998",
        numero: 3675,
        complemento: "ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula.",
        cidade: "Emalahleni",
        uf: "Friesland",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "Ap #227-4591 Proin Avenue",
        bairro: "Zlourburg",
        cep: "34393511",
        numero: 8732,
        complemento: "neque sed dictum eleifend,",
        cidade: "Shillong",
        uf: "Ryazan Oblast",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "1691 Odio. Street",
        bairro: "Veumsas",
        cep: "20460863",
        numero: 3886,
        complemento: "",
        cidade: "Drammen",
        uf: "Vienna",
        ativo: "0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "336-6312 Tincidunt Av.",
        bairro: "Veumsas",
        cep: "5827593",
        numero: 9383,
        complemento: "id, blandit at, nisi. Cum sociis",
        cidade: "Canberra",
        uf: "Cartago",
        ativo: "0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "Ap #748-1737 Ligula. Street",
        bairro: "Mam",
        cep: "22151900",
        numero: 2165,
        complemento: "lorem eu metus. In lorem. Donec elementum,",
        cidade: "Ilhéus",
        uf: "Lorraine",
        ativo: "0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "747-8967 Mi Road",
        bairro: "Froifginia",
        cep: "47306154",
        numero: 5094,
        complemento: "eget lacus. Mauris non dui",
        cidade: "Dokkum",
        uf: "Jigawa",
        ativo: "0",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        logradouro: "402-9935 A, Rd.",
        bairro: "Rerton",
        cep: "45188766",
        numero: 7306,
        complemento: "volutpat.",
        cidade: "Banda Aceh",
        uf: "North Sumatra",
        ativo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enderecos', null, {});
  }
};
