/** @format */

const express = require('express');
const router = express.Router();
const ActionPlanController = require('../controllers/actionPlans.controller');

// Create a new action plan
router.post('/', ActionPlanController.createActionPlan);

// Get all action plans
router.get('/', ActionPlanController.getAllActionPlans);

// Get a single action plan by ID
router.get('/:id', ActionPlanController.getActionPlanById);

// Update an action plan by ID
router.put('/:id', ActionPlanController.updateActionPlan);

// Delete an action plan by ID
router.delete('/:id', ActionPlanController.deleteActionPlan);

module.exports = router;
