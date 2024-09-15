
const conn = require('../database/db');
const carModel = require('../model/carModel')

async function createCar(req,res){
    const { brand, model, year, items } = req.body;

    if(!brand && !model&& !year && !Array.isArray(items) && items.length == 0 ){
        return res.status(400).json({error: 'fill in the empty fields'})
    }
    
    if(!brand){
    return res.status(400).json({error: 'brand is required'});
    }else if(!model) {
    return res.status(400).json({error: 'model is required'});
    }else if(!year) {
        return res.status(400).json({error: 'year is required'});
    }else if(!items) {
        return res.status(400).json({error: 'items is required'});
    }

    const fullYear = new Date().getFullYear();

    if(year < 2015 || year > fullYear){
        return res.status(400).json({message: "year should be between 2015 and 2025"});
    }

    if(await carModel.carsExists(brand,model,year)){
        return res.status(409).json({ error: "there is already a car with this data" });
    }

    const itemsUnique = [...new Set(items)];

    try{
        const idCar = await carModel.createCar(brand,model,year);
        await carModel.addItems(idCar,itemsUnique);

        return res.status(201).json({ message: 'Carro criado com sucesso', id: idCar });
    }catch (err) {
        console.error('Erro ao criar carro:', err.message);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}


async function getCar(req, res) {
    
    try {
        
        const [rows] = await conn.execute('SELECT COUNT(*) AS count FROM cars');
        const count = rows[0].count;
        
        const { page = 1 } = req.query;
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 5, 1), 10); 
        const offset = (page - 1) * limit;

        let lastPage = 1;

        if (count !== 0) {
            lastPage = Math.ceil(count / limit);
        } else {
            return res.status(204).send();
        }

        const cars = await carModel.getPaginatedCars(limit, offset);
        //queryParams model/brand
        const {brand,model,year} = req.query;

        if(brand || model || year){

            const result = await carModel.getCarParams(brand,model,year);
            
            if(result.length === 0){
               return res.status(204).json(result);
            }
            return res.status(200).json(result);
        }
        
        res.status(200).json({
            count,
            pages: lastPage,
            data: cars
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function getCarById(req,res){
    const {id} = req.params;
    const result = await carModel.getCarById(id);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({message: "car not found"})
        }
  
}

async function deleteCar(req, res) {
    const {id } = req.params;
   
    const result = await carModel.deleteCar(id);

    if (result.affectedRows > 0) {
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
}

module.exports = {
    createCar,
    deleteCar,
    getCar,
    getCarById,
  
};

