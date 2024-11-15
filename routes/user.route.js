/** @format */

const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Define routes for CRUD operations

// Route to create a new user
router.post('/create', userController.createUser);

// Route to get all users
router.get('/', userController.getUsers);

// Route to get all coaches
router.get('/coaches', userController.getCoaches);

// Route to get all clients
router.get('/clients', userController.getClients);

// Route to get a single user by ID
router.get('/:id', userController.getUserById);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
