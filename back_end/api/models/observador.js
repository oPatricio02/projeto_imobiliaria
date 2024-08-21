'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) =>{
    class Observador extends Model {
        
      
        // Método para adicionar um novo observador
        static async add(email, tipo) {
          try {
            const observador = await this.create({ email, tipo });
            console.log('Observador adicionado:', observador.toJSON());
            return observador;
          } catch (error) {
            console.error('Erro ao adicionar observador:', error);
            throw error;
          }
        }
      
        static async notifyObservers(tipo) {
      
          const observadores = await Observador.findAll({
            where: {
              tipo_interessado: tipo 
            }
          });
          console.log("Aqui chegou");
    
          // Exibir mensagem no console para observadores
          observadores.forEach(observador => {
            console.log(`Notificando ${observador.email}`);
          });
          console.log("Aqui saiu")
        }
      }
      
      Observador.init({
        email: DataTypes.STRING,
        tipo: {
          type: DataTypes.STRING,
          field: 'tipo_interessado' // Nome do campo na tabela do banco de dados
        }
      }, {
        sequelize,
        modelName: 'Observador',
        tableName: 'observadores'
      });


      return Observador;
}


