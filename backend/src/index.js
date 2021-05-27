const express = require('express');
const cors = require('cors')
const { errors } = require('celebrate')

const routes = require('./routes')

/** 
Tipos de params 
* Query Params: Parametros nomeados enviados na rota apos simbolo de "interrogação" para filtros e paginação
* Route Params: Parâmetros utilizados para indentificar recursos ex: (:id)
* Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/**
 Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 */

const app = express();
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

app.listen(3333, () => {
    console.log('back-end started! ✔')
});


