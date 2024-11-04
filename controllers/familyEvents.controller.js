const FamilyEvent = require('../models/familyEvent.model');

// Create a new family event
const createFamilyEvent = async (req, res) => {
    const { post_title, content, cover_img, description } = req.body;
    try {
        const familyEvent = await FamilyEvent.create({ post_title, content, cover_img, description });
        res.status(201).json(familyEvent);
    } catch (err) {
        console.error('Error creating family event:', err);
        res.status(500).send('Server error');
    }
};

// Get all family events
const getAllFamilyEvents = async (req, res) => {
    try {
        const familyEvents = await FamilyEvent.findAll();
        res.json(familyEvents);
    } catch (err) {
        console.error('Error fetching family events:', err);
        res.status(500).send('Server error');
    }
};

// Get a single family event by ID
const getFamilyEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const familyEvent = await FamilyEvent.findByPk(id);
        if (!familyEvent) {
            return res.status(404).send('Family event not found');
        }
        res.json(familyEvent);
    } catch (err) {
        console.error('Error fetching family event:', err);
        res.status(500).send('Server error');
    }
};

// Update a family event by ID
const updateFamilyEvent = async (req, res) => {
    const { id } = req.params;
    const { post_title, content, cover_img, description } = req.body;
    try {
        const familyEvent = await FamilyEvent.findByPk(id);
        if (!familyEvent) {
            return res.status(404).send('Family event not found');
        }
        await familyEvent.update({ post_title, content, cover_img, description });
        res.json({ message: 'Family event updated successfully' });
    } catch (err) {
        console.error('Error updating family event:', err);
        res.status(500).send('Server error');
    }
};

// Delete a family event by ID
const deleteFamilyEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const familyEvent = await FamilyEvent.findByPk(id);
        if (!familyEvent) {
            return res.status(404).send('Family event not found');
        }
        await familyEvent.destroy();
        res.json({ message: 'Family event deleted successfully' });
    } catch (err) {
        console.error('Error deleting family event:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createFamilyEvent,
    getAllFamilyEvents,
    getFamilyEventById,
    updateFamilyEvent,
    deleteFamilyEvent,
};
