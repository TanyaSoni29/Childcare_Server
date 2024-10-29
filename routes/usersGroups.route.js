/** @format */

const express = require('express');
const router = express.Router();
const userGroupController = require('../controllers/userGroups.controller');

// Route to get all user groups
router.get('/', userGroupController.getAllUserGroups);

// Route to get a single user group by ID
router.get('/:id', userGroupController.getUserGroupById);

module.exports = router;
