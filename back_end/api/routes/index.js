const bodyParser = require('body-parser');
const enderecos = require('./enderecosRoute');
const parametrizacao = require('./parametrizacaoRoute');
const imoveis = require('./imovelRoutes')
const pessoa = require('./pessoaRoute')
const fotos = require('./fotosRoute')
const clientes = require('./clientesRoute')
const interesses = require('./interessesRoute')
const agendamento = require('./agendamentoRoute')
const observador = require('./observadorRoute')

module.exports = app => {
    app.use(bodyParser.json());
    app.use(enderecos)
    app.use(parametrizacao)
    app.use(imoveis) 
    app.use(pessoa) 
    app.use(fotos)
    app.use(clientes)
    app.use(interesses)
    app.use(agendamento)
    app.use(observador)
}