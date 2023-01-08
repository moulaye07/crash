const router = require('express').Router();
const hospitalController = require('../controllers/hospital.controller');

router.post('/', hospitalController.createHosptal);

router.get('/all', hospitalController.getAllStations);

//le plus proche
router.get('/', hospitalController.getStation);

module.exports = router;