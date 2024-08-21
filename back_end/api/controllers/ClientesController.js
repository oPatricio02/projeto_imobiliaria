const database = require('../models')

class ClientesController{


    static async getClientes(req, res) {
        try {
            const allClientes = await database.Clientes.findAll(
                {
                    where:
                    {
                        tipo_cli: 'proprietario',
                        ativo: Number(1)
                    }
                }
            )
            return res.status(200).json(allClientes)
        }
        catch (error) {
            return res.status(500).json(error)
        }
    }

    static async getClientesById(req,res)
    {
        const { id } = req.params
        try {
            const selectedCliente = await database.Clientes.findOne(
                {
                    where: 
                        {
                            id: Number(id),
                            ativo: Number(1)
                        }
                })
            if(selectedCliente){ // Verifica se é nulo
                return res.status(200).json(selectedCliente)
            }else{
                return res.status(400).json({message: 'ID de Cliente não encontrado'})
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = ClientesController