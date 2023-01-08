const router = require('express').Router();
const carController = require('../controllers/car.controller');

router.post('/', carController.createCar);

// get accidents
router.get('/', carController.getCars);
router.get('/:plaque', carController.getACar);

router.get('/owner/:id', carController.getAllCarOfAPerson);

//modifier
router.put('/:plaque', carController.updateCar);

module.exports = router;