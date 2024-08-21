'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agendamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Agendamento.belongsTo(models.Pessoas,{
        foreignKey: 'pessoa_id'
      })
      Agendamento.belongsTo(models.Imoveis,{
        foreignKey: 'imoveis_id'
      })
      Agendamento.belongsTo(models.Interesses,{
        foreignKey: 'interesse_id'
      })
    }
  }
  Agendamento.init({
    data: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agendamento',
  });
  return Agendamento;
};