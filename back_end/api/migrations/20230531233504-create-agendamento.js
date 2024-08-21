'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Agendamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imoveis_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Imoveis",
          key: "id"
        }
      },
      pessoa_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: "Pessoas",
          id: "id"
        }
      },
      interesse_id:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references:{
          model: "Interesses",
          id: "id"
        }
      },
      corretor_id:{
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Agendamentos');
  }
};