/** @format */

const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services.controller');

// Route to create a new news event
router.post('/', servicesController.createServices);

// Route to get all news events
router.get('/', servicesController.getAllServices);

// Route to get a single news event by ID
router.get('/:id', servicesController.getServiceById);

// Route to update a news event by ID
router.put('/:id', servicesController.updateService);

// Route to delete a news event by ID
router.delete('/:id', servicesController.deleteService);

module.exports = router;
