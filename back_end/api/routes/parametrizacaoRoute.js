const { Router } = require('express')
const ParametrizacaoController = require('../controllers/ParametrizacaoController')

const router = Router()

router
        .get('/parametrizacao', ParametrizacaoController.getParametrizacao)
        .get('/parametrizacao/count', ParametrizacaoController.getParametrizacaoCount)
        .get('/parametrizacao/:id', ParametrizacaoController.getParametrizacaoById)
        .post('/parametrizacao', ParametrizacaoController.createParametrizacao)
        .put('/parametrizacao/:id', ParametrizacaoController.updateParametrizacao)
        .delete('/parametrizacao/:id', ParametrizacaoController.deleteParametrizacao)
module.exports = router
