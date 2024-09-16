const conn = require('../database/db');


async function carsExists(brand, model, year) {
    const sql = 'SELECT COUNT(*) AS count FROM cars WHERE brand = ? AND model = ? AND year = ?';
    const [rows] = await conn.query(sql, [brand, model, year]);
    return rows[0].count > 0;
}

async function createCar(brand, model, year) {
    const sql = "INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)";
    const [result] = await conn.query(sql, [brand, model, year]);
    return result.insertId;
}
async function addItems(idCar, items) {
    const sql = "INSERT INTO cars_items (name, car_id) VALUES (?, ?)";
    for (let i = 0; i < items.length; i++) {
        await conn.query(sql, [items[i], idCar]);
    }
}

function getCar(req, res) {
    const sql = "SELECT * FROM cars";

    conn.query(sql)
        .then(([rows]) => {
            res.status(200).json([rows])
        }).catch((err) => {
            res.status(204)
        })
}
async function getPaginatedCars(limit, offset) {
    const sql = 'SELECT * FROM cars LIMIT ' + parseInt(limit) + ' OFFSET ' + parseInt(offset);
    const [rows] = await conn.execute(sql);
    return rows;
}

async function getCarById(id) {
    const sql = 'SELECT * FROM cars WHERE id = ?';
    try {
        const [result] = await conn.query(sql, [id]);
        return result[0];
    } catch (error) {
        throw error;
    }
}

async function getCarParams(brand, model, year) {
    const sql = `SELECT * FROM cars WHERE brand LIKE ? OR model LIKE ? AND year = ?`;
    const params = [
        `%${brand}%`,
        `%${model}%`,
        year
    ];

    const [rows] = await conn.execute(sql, params);
    return rows
}
async function updateCar(id, brand, model, year) {

    const sql = `
        UPDATE cars SET
        brand = CASE WHEN ? IS NOT NULL AND ? <> '' THEN ? ELSE brand END,
        model = CASE WHEN ? IS NOT NULL AND ? <> '' THEN ? ELSE model END,
        year = CASE WHEN ? IS NOT NULL AND ? <> '' THEN ? ELSE year END
        WHERE id = ?;
`;
    const [result] = await conn.query(sql, [brand, brand, brand, model, model, model, year, year, year, id]);
    return result;
}

async function updateItems(idCar, items) {
    const deleteSql = "DELETE FROM cars_items WHERE car_id = ?";
    await conn.query(deleteSql, [idCar]);

    const insertSql = "INSERT INTO cars_items (name, car_id) VALUES (?, ?)";
    for (let i = 0; i < items.length; i++) {

        if (items[i] !== null && items[i] !== "") {
            await conn.query(insertSql, [items[i], idCar]);
        }
    }
}

async function deleteCar(id) {
    const sql = 'DELETE FROM cars WHERE id = ?';
    const [result] = await conn.query(sql, [id]);
    console.log('Resultado da query:', result);
    return result;
}

module.exports = {
    createCar,
    carsExists,
    addItems,
    deleteCar,
    getCar,
    getPaginatedCars,
    getCarById,
    getCarParams,
    updateCar,
    updateItems
}