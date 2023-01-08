const router = require('express').Router();
const accidentController = require('../controllers/accident.controller');

router.post('/', accidentController.createAccident);

// get accidents
router.get('/', accidentController.getAccidents);
router.get('/date', accidentController.getAccidentDate);


router.get('/node', accidentController.getAccidentsOfNode);
router.get('/node/date', accidentController.getAccidentsOfNodeByDate);


router.get('/statistics', accidentController.getStats);
router.get('/statistics/date', accidentController.getStatsByDate);

router.get('/statistics/node', accidentController.getStatsOfNode);
router.get('/statistics/node/date', accidentController.getStatsOfNodeByDate);


router.get('/:id', accidentController.accidentData);

//modifier
router.put('/:id', accidentController.updateAccident);

module.exports = router;