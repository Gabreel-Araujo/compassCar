const mysql = require('mysql')

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'compasscar'
})


conection.connect((err)=>{
   if(err){
    console.log(err)
   }

   console.log("conexao com o banco de dados estabelecida");

})

module.exports = conection;