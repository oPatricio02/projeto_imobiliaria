const {Router} = require("express")
const ClientesController = require('../controllers/ClientesController')

const router = Router()
router.get('/proprietarios',ClientesController.getClientes)
router.get('/proprietarios/:id',ClientesController.getClientesById)

module.exports = router;