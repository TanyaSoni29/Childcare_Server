const express = require('express');
const router = express.Router();
const covid19Controller = require('../controllers/covid19.controller');

// Define routes for CRUD operations
router.post('/', covid19Controller.createCovid19);
router.get('/', covid19Controller.getAllCovid19s);
router.get('/:id', covid19Controller.getCovid19ById);
router.put('/:id', covid19Controller.updateCovid19);
router.delete('/:id', covid19Controller.deleteCovid19);

module.exports = router;
