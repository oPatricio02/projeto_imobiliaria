'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Imoveis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      proprietario_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Clientes',key: 'id'}
      },
      endereco_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Enderecos', key: 'id'}
      },
      fotos_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Fotos_Imoveis',key: 'id' }
      },
      descricao: {
        type: Sequelize.STRING
      },
      ativo: {
        type: Sequelize.BOOLEAN
      },
      tipo: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.DOUBLE
      },
      valor_minimo: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Imoveis');
  }
};