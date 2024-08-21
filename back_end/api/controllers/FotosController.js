const database = require('../models')

class FotosController{
    static async getFotos(req,res){
        try{
            const allFotos = await database.Fotos_Imoveis.findAll()
            return res.status(200).json(allFotos) 
        }catch(error){
            return res.status(500).json(error.message)
        }
    }


    static async getFotosById(req,res)
    {
        const { id } = req.params
        try {
            const selectedFotos = await database.Fotos_Imoveis.findOne(
                {
                    where: 
                        {
                            id: Number(id)
                        }
                })
            if(selectedFotos){ // Verifica se é nulo
                return res.status(200).json(selectedFotos)
            }else{
                return res.status(400).json({message: 'ID de Foto não encontrado'})
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async createFotos(req,res)
    {
        const newFotos = req.body
        try {
            const newFotosCreated = await database.Fotos_Imoveis.create(newFotos)
            return res.status(201).json(newFotosCreated)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    
}

module.exports = FotosController