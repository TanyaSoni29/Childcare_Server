const Blog = require('../models/blog.model'); // Import the Blog model from the models directory

// Function to create a new blog entry
const createBlog = async (req, res) => {
	const { post_title, content, cover_img, description } = req.body; // Destructure fields from the request body
	try {
		// Create a new blog entry using the provided data
		const blog = await Blog.create({
			post_title,
			content,
			cover_img,
			description,
		});
		res.status(201).json(blog); // Respond with the created blog entry and status 201
	} catch (err) {
		console.error('Error creating blog entry:', err); // Log any error that occurs
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message on failure
	}
};

// Function to get all blog entries
const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.findAll(); // Retrieve all blog entries from the database
		res.json(blogs); // Respond with the retrieved blog entries as JSON
	} catch (err) {
		console.error('Error fetching blogs:', err); // Log any error that occurs
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message on failure
	}
};

// Function to get a blog entry by its ID
const getBlogById = async (req, res) => {
	const { id } = req.params; // Get the blog ID from the request parameters
	try {
		const blog = await Blog.findByPk(id); // Find the blog entry by primary key (ID)
		if (!blog) return res.status(404).send('Blog entry not found'); // If blog not found, send 404 status
		res.json(blog); // Respond with the found blog entry as JSON
	} catch (err) {
		console.error('Error fetching blog entry:', err); // Log any error that occurs
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message on failure
	}
};

// Function to update a blog entry by its ID
const updateBlog = async (req, res) => {
	const { id } = req.params; // Get the blog ID from the request parameters
	const { post_title, content, cover_img, description } = req.body; // Destructure updated fields from request body
	try {
		const blog = await Blog.findByPk(id); // Find the blog entry by primary key (ID)
		if (!blog) return res.status(404).send('Blog entry not found'); // If blog not found, send 404 status
		await blog.update({ post_title, content, cover_img, description }); // Update the blog entry with new data
		res.json({ message: 'Blog entry updated successfully' }); // Respond with success message
	} catch (err) {
		console.error('Error updating blog entry:', err); // Log any error that occurs
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message on failure
	}
};

// Function to delete a blog entry by its ID
const deleteBlog = async (req, res) => {
	const { id } = req.params; // Get the blog ID from the request parameters
	try {
		const blog = await Blog.findByPk(id); // Find the blog entry by primary key (ID)
		if (!blog) return res.status(404).send('Blog entry not found'); // If blog not found, send 404 status
		await blog.destroy(); // Delete the blog entry from the database
		res.json({ message: 'Blog entry deleted successfully' }); // Respond with success message
	} catch (err) {
		console.error('Error deleting blog entry:', err); // Log any error that occurs
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message on failure
	}
};

// Export the functions for use in other parts of the application
module.exports = {
	createBlog,
	getAllBlogs,
	getBlogById,
	updateBlog,
	deleteBlog,
};
