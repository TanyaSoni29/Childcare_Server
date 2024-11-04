const express = require('express');
const router = express.Router();
const practiceController = require('../controllers/practice.controller');

// Define routes for CRUD operations
router.post('/', practiceController.createPractice);
router.get('/', practiceController.getAllPractices);
router.get('/:id', practiceController.getPracticeById);
router.put('/:id', practiceController.updatePractice);
router.delete('/:id', practiceController.deletePractice);

module.exports = router;
