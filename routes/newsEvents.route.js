const express = require('express');
const router = express.Router();
const newsEventController = require('../controllers/newsEvents.controller');

// Route to create a new news event
router.post('/', newsEventController.createNewsEvent);

// Route to get all news events
router.get('/', newsEventController.getAllNewsEvents);

// Route to get a single news event by ID
router.get('/:id', newsEventController.getNewsEventById);

// Route to update a news event by ID
router.put('/:id', newsEventController.updateNewsEvent);

// Route to delete a news event by ID
router.delete('/:id', newsEventController.deleteNewsEvent);

module.exports = router;
