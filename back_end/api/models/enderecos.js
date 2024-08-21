'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enderecos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Enderecos.hasOne(models.Parametrizacoes,{
        foreignKey: 'endereco_id'
      })
      
      Enderecos.hasOne(models.Pessoas,{
        foreignKey: 'endereco_id'
      })
    }
  }
  Enderecos.init({
    logradouro: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cep: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    cidade: DataTypes.STRING,
    uf: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Enderecos',
  });
  return Enderecos;
}