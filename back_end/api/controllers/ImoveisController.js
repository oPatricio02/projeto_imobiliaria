const database = require('../models')


class ImoveisController{
    static async getImoveis(req,res){
        try{
            const allImoveis = await database.Imoveis.findAll(
                {
                    where:
                    {
                        ativo: Number(1)
                    }
                }
            )
            return res.status(200).json(allImoveis) 
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async getImoveisById(req,res)
    {
        const { id } = req.params
        try {
            const selectedImovel = await database.Imoveis.findOne(
                {
                    where: 
                        {
                            id: Number(id),
                            ativo: Number(1)
                        }
                })
            if(selectedImovel){ // Verifica se é nulo
                return res.status(200).json(selectedImovel)
            }else{
                return res.status(400).json({message: 'ID de imóvel não encontrado'})
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    //Criar observer

    static async getImoveisByTipo(req,res)
    {
        const { tipoI } = req.params
        try{

            const imoveisSelecionados = await database.Imoveis.findAll(
                {
                    where:
                    {
                        ativo: Number(1),
                        tipo: tipoI
                    }
                })
                return res.status(200).json(imoveisSelecionados)
            }
        catch(error){
                return res.status(500).json(error.message)
         }
    }

    static async createImovel(req, res) {
        const newImovel = req.body
        try {
            const newImovelCreated = await database.Imoveis.create(newImovel)
            return res.status(201).json(newImovelCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateImovel(req, res) {
        const { id } = req.params
        const newInformation = req.body
        try {
            await database.Imoveis.update(newInformation,
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            const updatedImovel = await database.Imoveis.findOne(
                {
                    where: 
                        {
                            id: Number(id) 
                        }
                })
            return res.status(200).json(updatedImovel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteImovel(req, res) {
        const { id } = req.params
        const imovel = req.body
        imovel.ativo = false
        try {
            await database.Imoveis.update(imovel,
                {
                    where: 
                    {
                        id: Number(id)
                    }
                })
            return res.status(200).json({message: `Imóvel deletado com sucesso`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // Método para registrar um cliente como observador de um tipo específico de imóvel
    static async registerObserver(req, res) {
        const { tipoInteresse } = req.params;
        const observer = new Observer(); // Criar um novo observador
        // Adicionar lógica para registrar o cliente como observador do tipo de imóvel de interesse
        // Por exemplo, você pode armazenar os observadores em um mapa onde a chave é o tipo de imóvel e o valor é uma lista de observadores interessados
        // Aqui, vamos apenas imprimir uma mensagem para simular o registro do observador
        console.log(`Cliente registrado como observador para imóveis do tipo ${tipoInteresse}`);
        return res.status(200).json({ message: `Cliente registrado como observador para imóveis do tipo ${tipoInteresse}` });
    }
}

module.exports = ImoveisController