'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Pessoas.belongsTo(models.Enderecos,{
          foreignKey: 'endereco_id'
        })
        Pessoas.hasOne(models.Clientes,{
          foreignKey: 'pessoa_id'
        })
        Pessoas.hasOne(models.Agendamento,{
          foreignKey: 'pessoa_id'
        })
      }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    cnpj_cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    rg_ie: DataTypes.STRING,
    dta_nasc: DataTypes.DATEONLY,
    sexo: DataTypes.CHAR,
    celular: DataTypes.STRING,
    usuario: DataTypes.STRING,
    hash: DataTypes.STRING,
    dta_encerramento: DataTypes.DATEONLY,
    nivel_acesso: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
  });
  return Pessoas;
};