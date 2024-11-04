const express = require('express');
const router = express.Router();
const familyEventController = require('../controllers/familyEvents.controller');

// Route to create a new family event
router.post('/', familyEventController.createFamilyEvent);

// Route to get all family events
router.get('/', familyEventController.getAllFamilyEvents);

// Route to get a single family event by ID
router.get('/:id', familyEventController.getFamilyEventById);

// Route to update a family event by ID
router.put('/:id', familyEventController.updateFamilyEvent);

// Route to delete a family event by ID
router.delete('/:id', familyEventController.deleteFamilyEvent);

module.exports = router;
