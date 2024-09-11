const mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "admin",
    database: 'compasscar'
});

console.log('conectado ao banco de dados');

module.exports = conn;