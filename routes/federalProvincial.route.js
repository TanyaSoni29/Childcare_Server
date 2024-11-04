const express = require('express');
const router = express.Router();
const federalProvincialController = require('../controllers/federalProvincial.controller');

// Define routes for CRUD operations
router.post('/', federalProvincialController.createFederalProvincial);
router.get('/', federalProvincialController.getAllFederalProvincials);
router.get('/:id', federalProvincialController.getFederalProvincialById);
router.put('/:id', federalProvincialController.updateFederalProvincial);
router.delete('/:id', federalProvincialController.deleteFederalProvincial);

module.exports = router;
