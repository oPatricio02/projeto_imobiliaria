'use strict';
const { Model } = require('sequelize');
const Observador = require('./observador');

module.exports = (sequelize, DataTypes) => {
  class Imoveis extends Model {
    static associate(models) {
      Imoveis.belongsTo(models.Enderecos, {
        foreignKey: 'endereco_id'
      });
      Imoveis.belongsTo(models.Clientes, {
        foreignKey: 'proprietario_id'
      });
      Imoveis.belongsTo(models.Fotos_Imoveis, {
        foreignKey: 'fotos_id'
      });
      Imoveis.hasOne(models.Agendamento, {
        foreignKey: 'imoveis_id'
      });
    }
    
    static async adicionarImovel(descricao, ativo, tipo, valor, valor_minimo) {
      const imovel = await this.create({
        descricao,
        ativo,
        tipo,
        valor,
        valor_minimo
      });
      
      await Observador.notifyObservers(tipo);
      
      return imovel;
    }

    
  }

  Imoveis.init({
    descricao: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    tipo: DataTypes.STRING,
    valor: DataTypes.DOUBLE,
    valor_minimo: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Imoveis',
  });

  return Imoveis;
};
