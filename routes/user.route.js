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
router.post('/',  userController.createUser);
router.get('/',  userController.getUsers);
router.get('/:id',  userController.getUserById);
router.put('/:id',  userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;