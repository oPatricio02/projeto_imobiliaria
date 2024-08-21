'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interesse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Interesse.belongsTo(models.Imoveis,{
        foreignKey: 'imovel_id'
      })
      Interesse.hasOne(models.Agendamento,{
        foreignKey: 'interesse_id'
      })
    }
  }
  Interesse.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    celular: DataTypes.STRING,
    mensagem: DataTypes.STRING,
    dataInte: DataTypes.DATEONLY,
    dataDesat: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Interesses',
  });
  return Interesse;
};