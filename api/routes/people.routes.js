const router = require('express').Router();
const peopleController = require('../controllers/people.controller');

//add people
router.post("/", peopleController.addPeople);

// get people
router.get('/', peopleController.getPeople);

//get a person
router.get('/:id', peopleController.peopleData);

router.get('/:id/insurance', peopleController.peopleDataAndInsurance);
router.get('/:id/just/insurance', peopleController.peopleInsurance);

router.get('/:id/relatives', peopleController.peopleDataAndRelatives);
router.get('/:id/just/relatives', peopleController.peopleRelatives);

//modifier
router.put('/:id', peopleController.updatePeopleData);

module.exports = router;