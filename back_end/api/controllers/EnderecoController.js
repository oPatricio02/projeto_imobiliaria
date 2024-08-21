const database = require('../models') // O proprio javascript ja localiza o arquivo index dentro da pasta model

class EnderecoController {
    static async getEndereco(req, res) {
        try {
            const allAddresses = await database.Enderecos.findAll()
            return res.status(200).json(allAddresses) 
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getEnderecoById(req, res) {
        const { id } = req.params
        try {
            const selectedAddress = await database.Enderecos.findOne(
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            if(selectedAddress){ // Verifica se é nulo
                return res.status(200).json(selectedAddress)
            }else{
                return res.status(400).json({message: 'ID de endereço não encontrado'})
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async getEnderecoByToken(req, res) {
        try {
            const selectedAddress = await database.Enderecos.findOne(
                {
                    where: 
                        {
                            id: req.app.locals.payload.loginPessoas.endereco_id
                        }
                })
            if(selectedAddress){ // Verifica se é nulo
                return res.status(200).json(selectedAddress)
            }else{
                return res.status(400).json({message: 'ID de endereço não encontrado'})
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async createEndereco(req, res) {
        const newAddress = req.body
        try {
            const newAddressCreated = await database.Enderecos.create(newAddress)
            return res.status(201).json(newAddressCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateEndereco(req, res) {
        const { id } = req.params
        const newInformation = req.body
        try {
            await database.Enderecos.update(newInformation,
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            const updatedAddress = await database.Enderecos.findOne(
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            return res.status(200).json(updatedAddress)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateEnderecoByToken(req, res) {
        const newInformation = req.body
        try {
            await database.Enderecos.update(newInformation,
                {
                    where: 
                        {
                            id: req.app.locals.payload.loginPessoas.endereco_id
                        }
                })
            const updatedAddress = await database.Enderecos.findOne(
                {
                    where: 
                        {
                            id: req.app.locals.payload.loginPessoas.endereco_id 
                        }
                })
            return res.status(200).json(updatedAddress)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteEndereco(req, res) {
        const { id } = req.params
        try {
            await database.Enderecos.destroy(
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            return res.status(200).json({message: `Endereço de id: ${id}, deletado com sucesso`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = EnderecoController