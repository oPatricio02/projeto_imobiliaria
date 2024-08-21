'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parametrizacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parametrizacoes.belongsTo(models.Enderecos,{
        foreignKey: 'endereco_id'
      })
    }
  }
  Parametrizacoes.init({
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    razao_social: DataTypes.STRING,
    nome_fantasia: DataTypes.STRING,
    is: DataTypes.STRING,
    site: DataTypes.STRING,
    logo_grande: DataTypes.STRING,
    logo_pequeno: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Parametrizacoes',
  });
  return Parametrizacoes;
};