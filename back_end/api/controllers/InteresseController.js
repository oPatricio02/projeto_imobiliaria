const database = require('../models')

class InteressesController{
    static async createInteresse(req, res) {
        const newInteresse = req.body
        newInteresse.dataInte = new Date();
        try {
            const newInteresseCreated = await database.Interesses.create(newInteresse)
            return res.status(201).json(newInteresseCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}
module.exports = InteressesController