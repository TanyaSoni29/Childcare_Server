/** @format */
const path = require('path');
const fs = require('fs');
const NewsEvent = require('../models/newsEvent.model');

// Create a new news event
// const createNewsEvent = async (req, res) => {
// 	const { post_title, content, description } = req.body;
// 	const { cover_img } = req.files.cover_img;
// 	try {
// 		const newsEvent = await NewsEvent.create({
// 			post_title,
// 			content,
// 			cover_img,
// 			description,
// 		});
// 		res.status(201).json(newsEvent);
// 	} catch (err) {
// 		console.error('Error creating news event:', err);
// 		res.status(500).send('Server error');
// 	}
// };

const createNewsEvent = async (req, res) => {
    const { post_title, content, description } = req.body;
    let coverImgPath = null;

    // Check if a file was uploaded
    if (req.files && req.files.cover_img) {
        const coverImage = req.files.cover_img;
        const uploadDir = path.join(__dirname, '../uploads'); // Specify the upload directory

        // Create the upload directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Generate a unique filename to avoid overwriting
        const uniqueFileName = `${Date.now()}_${coverImage.name}`;
        coverImgPath = path.join('/uploads', uniqueFileName);

        // Move the file to the upload directory
        coverImage.mv(path.join(uploadDir, uniqueFileName), (err) => {
            if (err) {
                console.error('File upload error:', err);
                return res.status(500).send('Error uploading file');
            }
        });
    }

    try {
        // Save the new news event with the image path
        const newsEvent = await NewsEvent.create({
            post_title,
            content,
            description,
            cover_img: coverImgPath, // Store the relative path to the image
        });
        res.status(201).json(newsEvent);
    } catch (err) {
        console.error('Error creating news event:', err);
        res.status(500).send('Server error');
    }
};

// Get all news events
const getAllNewsEvents = async (req, res) => {
	try {
		const newsEvents = await NewsEvent.findAll();
		res.json(newsEvents);
	} catch (err) {
		console.error('Error fetching news events:', err);
		res.status(500).send('Server error');
	}
};

// Get a single news event by ID
const getNewsEventById = async (req, res) => {
	const { id } = req.params;
	try {
		const newsEvent = await NewsEvent.findByPk(id);
		if (!newsEvent) {
			return res.status(404).send('News event not found');
		}
		res.json(newsEvent);
	} catch (err) {
		console.error('Error fetching news event:', err);
		res.status(500).send('Server error');
	}
};

// Update a news event by ID
const updateNewsEvent = async (req, res) => {
	const { id } = req.params;
	const { post_title, content, cover_img, description } = req.body;
	try {
		const newsEvent = await NewsEvent.findByPk(id);
		if (!newsEvent) {
			return res.status(404).send('News event not found');
		}
		await newsEvent.update({ post_title, content, cover_img, description });
		res.json({ message: 'News event updated successfully' });
	} catch (err) {
		console.error('Error in updating news event:', err);
		res.status(500).send('Server error');
	}
};

// Delete a news event by ID
const deleteNewsEvent = async (req, res) => {
	const { id } = req.params;
	try {
		const newsEvent = await NewsEvent.findByPk(id);
		if (!newsEvent) {
			return res.status(404).send('News event not found');
		}
		await newsEvent.destroy();
		res.json({ message: 'News event deleted successfully' });
	} catch (err) {
		console.error('Error in deleting news event:', err);
		res.status(500).send('Server error');
	}
};

module.exports = {
	createNewsEvent,
	getAllNewsEvents,
	getNewsEventById,
	updateNewsEvent,
	deleteNewsEvent,
};
