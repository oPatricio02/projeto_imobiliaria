const database = require('../models')

class AgendamentoController{
    static async getAgendamento(req,res){
        try{
            const allAgendamento = await database.Agendamento.findAll()
            return res.status(200).json(allAgendamento) 
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async getAgendamentoById(req,res)
    {
        const { id } = req.params
        try {
            const selectedAgendamento = await database.Agendamento.findOne(
                {
                    where: 
                        {
                            id: Number(id)
                        }
                })
            if(selectedAgendamento){ // Verifica se é nulo
                return res.status(200).json(selectedAgendamento)
            }else{
                return res.status(400).json({message: 'ID de imóvel não encontrado'})
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createAgendamento(req, res) {
        const newAgendamento = req.body
        try {
            const newAgendamentoCreated = await database.Agendamento.create(newAgendamento)
            return res.status(201).json(newAgendamentoCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateAgendamento(req, res) {
        const { id } = req.params
        const newInformation = req.body
        try {
            await database.Agendamento.update(newInformation,
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            const updatedAgendamento = await database.Agendamento.findOne(
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            return res.status(200).json(updatedAgendamento)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteAgendamento(req, res) {
        const { id } = req.params
        try {
            await database.Agendamento.destroy(
                {
                    where:
                    {
                        id: Number(id)
                    }
                })
            return res.status(200).json({ message: `Agendamento de id: ${id},deletada com sucesso` })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    
}

module.exports = AgendamentoController