const fs = require('fs');
const path = require('path');
const NewsEvent = require('../models/newsEvent.model');

// Create a new news event
const createNewsEvent = async (req, res) => {
    const { post_title, content, description } = req.body;
    let cover_img = null;

    try {
        // Check if a file was uploaded
        if (req.files && req.files.cover_img) {
            const coverImgFile = req.files.cover_img;
            const uploadDir = path.join(__dirname, '../uploads'); // Ensure this folder exists
            const uploadPath = path.join(uploadDir, coverImgFile.name);

            // Move the file to the uploads folder
            await coverImgFile.mv(uploadPath);

            // Save the file path or URL to the database
            cover_img = `/uploads/${coverImgFile.name}`;
        }

        // Create a new record in the database
        const newsEvent = await NewsEvent.create({
            post_title,
            content,
            cover_img,
            description,
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

// Update a news event by ID, including optional cover image update
const updateNewsEvent = async (req, res) => {
    const { id } = req.params;
    const { post_title, content, description } = req.body;

    try {
        const newsEvent = await NewsEvent.findByPk(id);
        if (!newsEvent) {
            return res.status(404).send('News event not found');
        }

        let cover_img = newsEvent.cover_img; // Retain the current image path by default

        // Check if a new file was uploaded and handle the file replacement
        if (req.files && req.files.cover_img) {
            const coverImgFile = req.files.cover_img;
            const uploadDir = path.join(__dirname, '../uploads');
            const uploadPath = path.join(uploadDir, coverImgFile.name);

            // Delete the old file if it exists
            if (cover_img) {
                const oldFilePath = path.join(__dirname, '..', cover_img);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath);
                }
            }

            // Move the new file to the uploads folder
            await coverImgFile.mv(uploadPath);
            cover_img = `/uploads/${coverImgFile.name}`; // Update to the new file path
        }

        // Update the news event in the database
        await newsEvent.update({ post_title, content, cover_img, description });
        res.json({ message: 'News event updated successfully' });
    } catch (err) {
        console.error('Error in updating news event:', err);
        res.status(500).send('Server error');
    }
};

// Delete a news event by ID and remove the associated file
const deleteNewsEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const newsEvent = await NewsEvent.findByPk(id);
        if (!newsEvent) {
            return res.status(404).send('News event not found');
        }

        // Delete the associated file from the filesystem if it exists
        if (newsEvent.cover_img) {
            const filePath = path.join(__dirname, '..', newsEvent.cover_img);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Successfully deleted file: ${filePath}`);
            } else {
                console.warn(`File not found: ${filePath}`);
            }
        }

        // Delete the news event record from the database
        await newsEvent.destroy();
        res.json({ message: 'News event and associated file deleted successfully' });
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
