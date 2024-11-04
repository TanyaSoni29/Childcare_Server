/** @format */

const Blog = require('../models/blog.model');

const createBlog = async (req, res) => {
	const { post_title, content, cover_img, description } = req.body;
	try {
		const blog = await Blog.create({
			post_title,
			content,
			cover_img,
			description,
		});
		res.status(201).json(blog);
	} catch (err) {
		console.error('Error creating blog entry:', err);
		res.status(500).send('Server error');
	}
};

const getAllBlogs = async (req, res) => {
	try {
		const blogs = await Blog.findAll();
		res.json(blogs);
	} catch (err) {
		console.error('Error fetching blogs:', err);
		res.status(500).send('Server error');
	}
};

const getBlogById = async (req, res) => {
	const { id } = req.params;
	try {
		const blog = await Blog.findByPk(id);
		if (!blog) return res.status(404).send('Blog entry not found');
		res.json(blog);
	} catch (err) {
		console.error('Error fetching blog entry:', err);
		res.status(500).send('Server error');
	}
};

const updateBlog = async (req, res) => {
	const { id } = req.params;
	const { post_title, content, cover_img, description } = req.body;
	try {
		const blog = await Blog.findByPk(id);
		if (!blog) return res.status(404).send('Blog entry not found');
		await blog.update({ post_title, content, cover_img, description });
		res.json({ message: 'Blog entry updated successfully' });
	} catch (err) {
		console.error('Error updating blog entry:', err);
		res.status(500).send('Server error');
	}
};

const deleteBlog = async (req, res) => {
	const { id } = req.params;
	try {
		const blog = await Blog.findByPk(id);
		if (!blog) return res.status(404).send('Blog entry not found');
		await blog.destroy();
		res.json({ message: 'Blog entry deleted successfully' });
	} catch (err) {
		console.error('Error deleting blog entry:', err);
		res.status(500).send('Server error');
	}
};

module.exports = {
	createBlog,
	getAllBlogs,
	getBlogById,
	updateBlog,
	deleteBlog,
};
