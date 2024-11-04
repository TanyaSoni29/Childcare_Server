const ChildcareJourney = require('../models/childcareJourney.model');

// Create a new childcare journey entry
const createChildcareJourney = async (req, res) => {
    const { post_title, content, cover_img, description } = req.body;
    try {
        const journey = await ChildcareJourney.create({ post_title, content, cover_img, description });
        res.status(201).json(journey);
    } catch (err) {
        console.error('Error creating childcare journey:', err);
        res.status(500).send('Server error');
    }
};

// Get all childcare journey entries
const getAllChildcareJourneys = async (req, res) => {
    try {
        const journeys = await ChildcareJourney.findAll();
        res.json(journeys);
    } catch (err) {
        console.error('Error fetching childcare journeys:', err);
        res.status(500).send('Server error');
    }
};

// Get a single childcare journey entry by ID
const getChildcareJourneyById = async (req, res) => {
    const { id } = req.params;
    try {
        const journey = await ChildcareJourney.findByPk(id);
        if (!journey) return res.status(404).send('Childcare journey not found');
        res.json(journey);
    } catch (err) {
        console.error('Error fetching childcare journey:', err);
        res.status(500).send('Server error');
    }
};

// Update a childcare journey entry by ID
const updateChildcareJourney = async (req, res) => {
    const { id } = req.params;
    const { post_title, content, cover_img, description } = req.body;
    try {
        const journey = await ChildcareJourney.findByPk(id);
        if (!journey) return res.status(404).send('Childcare journey not found');
        await journey.update({ post_title, content, cover_img, description });
        res.json({ message: 'Childcare journey updated successfully' });
    } catch (err) {
        console.error('Error updating childcare journey:', err);
        res.status(500).send('Server error');
    }
};

// Delete a childcare journey entry by ID
const deleteChildcareJourney = async (req, res) => {
    const { id } = req.params;
    try {
        const journey = await ChildcareJourney.findByPk(id);
        if (!journey) return res.status(404).send('Childcare journey not found');
        await journey.destroy();
        res.json({ message: 'Childcare journey deleted successfully' });
    } catch (err) {
        console.error('Error deleting childcare journey:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createChildcareJourney,
    getAllChildcareJourneys,
    getChildcareJourneyById,
    updateChildcareJourney,
    deleteChildcareJourney,
};
