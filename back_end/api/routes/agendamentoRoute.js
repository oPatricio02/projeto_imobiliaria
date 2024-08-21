const {Router} = require("express")
const AgendamentoController = require('../controllers/AgendamentoController')
const router = Router()

router.get('/Agendamento',AgendamentoController.getAgendamento)
router.get('/Agendamento/:id',AgendamentoController.getAgendamentoById)
router.post('/Agendamento',AgendamentoController.createAgendamento)
router.put('/Agendamento/:id',AgendamentoController.updateAgendamento)
router.delete('/Agendamento/:id',AgendamentoController.deleteAgendamento)


module.exports = router;