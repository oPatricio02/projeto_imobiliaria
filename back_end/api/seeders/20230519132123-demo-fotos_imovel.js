'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('fotos_imoveis', [
      {
        url:'https://cdn.discordapp.com/attachments/1111706210043969586/1111806686844428289/20220701194030388699.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url:'https://cdn.discordapp.com/attachments/1111706210043969586/1111706653411258458/imovel_1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url:'https://cdn.discordapp.com/attachments/1111706210043969586/1111706680535814164/imovel_2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('fotos_imoveis', null, {});
  }
};
