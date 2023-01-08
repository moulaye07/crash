const router = require('express').Router();
const insuranceController = require('../controllers/insurance.controller');

router.post("/", insuranceController.createInsurance);

router.get('/', insuranceController.getInsurances);

router.get('/:id', insuranceController.getInsuranceData);

module.exports = router;