const conn = require('../database/db');


async function carsExists(brand,model,year){
    const sql = 'SELECT COUNT(*) AS count FROM cars WHERE brand = ? AND model = ? AND year = ?';
    const [rows] = await conn.query(sql, [brand, model, year]);
    
        return rows[0].count > 0;
  
}

async function createCar(brand,model,year){
    const sql = "INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)";

    const [result] = await conn.query(sql,[brand,model,year]);

   return result.insertId;
   
    
    }
    


    async function addItems(idCar, items) {
        const sql = "INSERT INTO cars_items (name, car_id) VALUES (?, ?)";
        
        // Insere cada item associado ao car_id
        for (let i = 0; i < items.length; i++) {
            await conn.query(sql, [items[i], idCar]);
        }
    }


module.exports = {
    createCar,
    carsExists,
    addItems
}

    
    