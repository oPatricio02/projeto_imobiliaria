const {Router} = require("express")
const ImoveisController = require('../controllers/ImoveisController')
const verifyToken = require('../middleware/verifyToken')
const router = Router()

//Todos
router.get('/imoveis',ImoveisController.getImoveis)
//Todos com token
router.get('/imovel',verifyToken,ImoveisController.getImoveis)
//Todos com filtro
router.get('/imoveis/filter/:tipoI',ImoveisController.getImoveisByTipo)
//Especifico por id
router.get('/imoveis/:id',ImoveisController.getImoveisById)
router.post('/imoveis',ImoveisController.createImovel)
router.put('/imoveis/:id',ImoveisController.updateImovel)
router.delete('/imoveis/:id',ImoveisController.deleteImovel)


module.exports = router;