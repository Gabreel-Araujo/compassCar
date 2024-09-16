const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController')
const carModel = require('../model/carModel')

router.post('/api/v1/cars', carController.createCar); 
router.delete('/api/v1/cars/:id', carController.deleteCar);
router.get('/api/v1/cars', carController.getCar);
router.get('/api/v1/cars/:id', carController.getCarById);
router.patch('/api/v1/cars/:id', carController.updateCar);



module.exports = router;