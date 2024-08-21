const {Router} = require("express")
const FotosController = require('../controllers/FotosController')

const router = Router()
router.get('/fotos/:id',FotosController.getFotosById)
router.get('/fotos',FotosController.getFotos)
router.post('/fotos',FotosController.createFotos)

module.exports = router;