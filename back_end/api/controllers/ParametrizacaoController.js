const database = require('../models') // O proprio javascript ja localiza o arquivo index dentro da pasta model

class ParametrizacaoController {
    static async getParametrizacao(req,res) {
        try {
            const allParametrizacao = await database.Parametrizacoes.findAll()
            return res.status(200).json(allParametrizacao)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getParametrizacaoCount(req,res) {
        try {
            const allParametrizacao = await database.Parametrizacoes.findAndCountAll()

        return res.status(200).json({quantidade: allParametrizacao.count})

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getParametrizacaoById(req,res) {
        const {id} = req.params
        try {
            const selectedParametrizacao = await database.Parametrizacoes.findOne(
                {
                    where: 
                        {
                            id: Number(id)
                        }
                })
            if(selectedParametrizacao){ // Verifica se é nulo
                return res.status(200).json(selectedParametrizacao)
            }else{
                return res.status(400).json({message: 'ID de parametrização não encontrado'})
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async createParametrizacao(req,res) {
        const parametrizacao = req.body
        try {
            const newParametrizacao = await database.Parametrizacoes.create(parametrizacao)
            return res.status(201).json(newParametrizacao)
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    static async updateParametrizacao(req,res) {
        const {id} = req.params
        const parametrizacao = req.body
        try {
            await database.Parametrizacoes.update(parametrizacao,
                {
                    where: 
                        {
                            id: Number(id)
                        }
                })
            const updatedParametrizacao = await database.Parametrizacoes.findOne(
                {
                    where: 
                        {
                            id: Number(id)
                        }
                })
                return res.status(200).json(updatedParametrizacao)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteParametrizacao(req,res) {
        const {id} = req.params
        try {
            await database.Parametrizacoes.destroy(
                {
                    where:
                        {
                            id: Number(id)
                        }
                })
            return res.status(200).json({message: `Parametrização de id: ${id},deletada com sucesso`})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = ParametrizacaoController