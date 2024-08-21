'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      endereco_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Enderecos',
          key: 'id'
        }
      },
      nome: {
        type: Sequelize.STRING
      },
      cnpj_cpf: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      rg_ie: {
        type: Sequelize.STRING
      },
      dta_nasc: {
        type: Sequelize.DATEONLY
      },
      sexo: {
        type: Sequelize.CHAR
      },
      celular: {
        type: Sequelize.STRING
      },
      usuario: {
        unique: true,
        type: Sequelize.STRING
      },
      hash: {
        type: Sequelize.STRING
      },
      dta_encerramento: {
        type: Sequelize.DATEONLY
      },
      nivel_acesso: {
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
    await queryInterface.dropTable('Pessoas');
  }
};