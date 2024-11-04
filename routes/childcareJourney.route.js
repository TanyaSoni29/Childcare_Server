const express = require('express');
const router = express.Router();
const childcareJourneyController = require('../controllers/childcareJourney.controller');

// Define routes for CRUD operations
router.post('/', childcareJourneyController.createChildcareJourney);
router.get('/', childcareJourneyController.getAllChildcareJourneys);
router.get('/:id', childcareJourneyController.getChildcareJourneyById);
router.put('/:id', childcareJourneyController.updateChildcareJourney);
router.delete('/:id', childcareJourneyController.deleteChildcareJourney);

module.exports = router;
