const express = require('express');
const routes = require('./routes')
var cors = require('cors')
const app = express();
const port = 8000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.use(cors()) // Use this after the variable declaration

routes(app)

app.listen(port, () => {
    console.log(`Servidor executando em: http://localhost:${port}`)
})
app.get('/', (req, res) => {
    return res.send('Back End Funcionando!');
  });

module.exports = app;