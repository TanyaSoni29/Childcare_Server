/** @format */

// const express = require('express');
// const { authenticateToken, authorizeRoles } = require('../middleware/auth.middleware');
// const userController = require('../controllers/user.controller');

// const router = express.Router();

// // Define routes for CRUD operations
// router.post('/', authenticateToken, authorizeRoles(['Admin']), userController.createUser);
// router.get('/', authenticateToken, authorizeRoles(['Admin', 'Coach']), userController.getUsers);
// router.get('/:id', authenticateToken, authorizeRoles(['Admin', 'Coach']), userController.getUserById);
// router.put('/:id', authenticateToken, authorizeRoles(['Admin']), userController.updateUser);
// router.delete('/:id', authenticateToken, authorizeRoles(['Admin']), userController.deleteUser);

// module.exports = router;

const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Define routes for CRUD operations

// Route to create a new user
router.post('/create', userController.createUser);

// Route to get all users
router.get('/', userController.getUsers);
router.get('/coaches', userController.getCoaches);

// Route to get a single user by ID
router.get('/:id', userController.getUserById);

// Route to update a user by ID
router.put('/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
