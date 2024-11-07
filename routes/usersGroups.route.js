/** @format */

const express = require('express');
const router = express.Router();
const userGroupController = require('../controllers/userGroups.controller');

// Define routes for CRUD operations: create, read, update, and delete (CRUD) operations for user groups.
router.post('/', userGroupController.createUserGroups);
router.get('/', userGroupController.getAllUserGroups);

// Route to get a single user group by ID and delete user groups
router.get('/:id', userGroupController.getUserGroupById);
router.delete('/:id', userGroupController.deleteUserGroup);

module.exports = router;
