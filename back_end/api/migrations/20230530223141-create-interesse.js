'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Interesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imovel_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Imoveis',
          key: 'id'
        }
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      mensagem: {
        type: Sequelize.STRING
      },
      dataInte: {
        type: Sequelize.DATEONLY
      },
      dataDesat: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Interesses');
  }
};