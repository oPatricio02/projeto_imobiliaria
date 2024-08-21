'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fotos_Imoveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fotos_Imoveis.hasOne(models.Imoveis,{
        foreignKey: 'fotos_id'
      })
    }
  }
  Fotos_Imoveis.init({
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fotos_Imoveis',
  });
  return Fotos_Imoveis;
};