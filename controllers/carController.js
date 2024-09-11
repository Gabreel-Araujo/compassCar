const express = require('express');
const conn = require('../database/db');
const carModel = require('../model/carModel')

async function createCar(req,res){
   
    const { brand, model, year, items } = req.body;

    if(!brand || !model|| !year || !Array.isArray(items) || items.length == 0 ){
        return res.status(400).json({error: 'brand is required'})
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

module.exports = {
    createCar
};

