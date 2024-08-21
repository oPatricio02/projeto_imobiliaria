const {Router} = require("express")
const PessoaController = require('../controllers/PessoaController')
const verifyToken = require('../middleware/verifyToken')
const router = Router()

router.get('/pessoa',PessoaController.getPessoas)
router.get('/pessoa/token',verifyToken,PessoaController.getPessoaByToken)
router.get('/pessoa/:id',PessoaController.getPessoaById)
router.post('/pessoa',PessoaController.createPessoa)
router.post('/login',PessoaController.login)
router.put('/pessoa/token',verifyToken,PessoaController.updatePessoaByToken)
router.put('/pessoa/:id',PessoaController.updatePessoa)
router.delete('/pessoa/:id',PessoaController.deletePessoa)


module.exports = router;