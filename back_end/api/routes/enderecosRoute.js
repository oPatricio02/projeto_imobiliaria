const { Router } = require('express')
const EnderecoController = require('../controllers/EnderecoController')
const verifyToken = require('../middleware/verifyToken')

const router = Router()

router
        .get('/enderecos', EnderecoController.getEndereco)
        .get('/enderecos/token',verifyToken, EnderecoController.getEnderecoByToken)
        .get('/enderecos/:id', EnderecoController.getEnderecoById)
        .post('/enderecos', EnderecoController.createEndereco)
        .put('/enderecos/token',verifyToken, EnderecoController.updateEnderecoByToken)
        .put('/enderecos/:id', EnderecoController.updateEndereco)
        .delete('/enderecos/:id', EnderecoController.deleteEndereco)
module.exports = router