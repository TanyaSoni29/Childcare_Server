/** @format */

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

// Define routes for CRUD operations
router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
