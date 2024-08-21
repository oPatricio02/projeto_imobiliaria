const {Router} = require("express")
const InteressesController = require('../controllers/InteresseController')

const router = Router()
router.post('/interesses',InteressesController.createInteresse)

module.exports = router;