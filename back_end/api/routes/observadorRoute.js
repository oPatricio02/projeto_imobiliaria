const {Router} = require("express")
const ObservadorController = require('../controllers/ObservadorController')
const router = Router()

router.post('/observadores',ObservadorController.createObservador)

module.exports = router;