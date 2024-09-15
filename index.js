const express = require('express');
const app = express();

const db = require('./database/db');
const routesCar = require('./routes/routesCar')


app.use(express.json());
app.use('/', routesCar)

app.listen(3000, ()=>{
    console.log('servidor rodando na porta 3000')
})