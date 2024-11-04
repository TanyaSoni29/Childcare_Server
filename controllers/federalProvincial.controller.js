const FederalProvincial = require('../models/federalProvincial.model');

const createFederalProvincial = async (req, res) => {
    const { post_title, content, cover_img, description } = req.body;
    try {
        const federalProvincial = await FederalProvincial.create({ post_title, content, cover_img, description });
        res.status(201).json(federalProvincial);
    } catch (err) {
        console.error('Error creating federal provincial entry:', err);
        res.status(500).send('Server error');
    }
};

const getAllFederalProvincials = async (req, res) => {
    try {
        const federalProvincials = await FederalProvincial.findAll();
        res.json(federalProvincials);
    } catch (err) {
        console.error('Error fetching federal provincials:', err);
        res.status(500).send('Server error');
    }
};

const getFederalProvincialById = async (req, res) => {
    const { id } = req.params;
    try {
        const federalProvincial = await FederalProvincial.findByPk(id);
        if (!federalProvincial) return res.status(404).send('Federal provincial entry not found');
        res.json(federalProvincial);
    } catch (err) {
        console.error('Error fetching federal provincial entry:', err);
        res.status(500).send('Server error');
    }
};

const updateFederalProvincial = async (req, res) => {
    const { id } = req.params;
    const { post_title, content, cover_img, description } = req.body;
    try {
        const federalProvincial = await FederalProvincial.findByPk(id);
        if (!federalProvincial) return res.status(404).send('Federal provincial entry not found');
        await federalProvincial.update({ post_title, content, cover_img, description });
        res.json({ message: 'Federal provincial entry updated successfully' });
    } catch (err) {
        console.error('Error updating federal provincial entry:', err);
        res.status(500).send('Server error');
    }
};

const deleteFederalProvincial = async (req, res) => {
    const { id } = req.params;
    try {
        const federalProvincial = await FederalProvincial.findByPk(id);
        if (!federalProvincial) return res.status(404).send('Federal provincial entry not found');
        await federalProvincial.destroy();
        res.json({ message: 'Federal provincial entry deleted successfully' });
    } catch (err) {
        console.error('Error deleting federal provincial entry:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createFederalProvincial,
    getAllFederalProvincials,
    getFederalProvincialById,
    updateFederalProvincial,
    deleteFederalProvincial,
};
