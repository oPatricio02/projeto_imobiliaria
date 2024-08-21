const database = require('../models');

class ObservadorController {
  static async createObservador(req, res) {
    const newObservador = req.body;
    try {
      const newObservadorCreated = await database.Observador.create(newObservador); // Corrigido para Observador.create
      return res.status(201).json(newObservadorCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ObservadorController;
