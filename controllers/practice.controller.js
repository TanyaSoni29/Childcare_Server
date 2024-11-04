const Practice = require('../models/practice.model');

const createPractice = async (req, res) => {
    const { post_title, content, cover_img, description } = req.body;
    try {
        const practice = await Practice.create({ post_title, content, cover_img, description });
        res.status(201).json(practice);
    } catch (err) {
        console.error('Error creating practice entry:', err);
        res.status(500).send('Server error');
    }
};

const getAllPractices = async (req, res) => {
    try {
        const practices = await Practice.findAll();
        res.json(practices);
    } catch (err) {
        console.error('Error fetching practices:', err);
        res.status(500).send('Server error');
    }
};

const getPracticeById = async (req, res) => {
    const { id } = req.params;
    try {
        const practice = await Practice.findByPk(id);
        if (!practice) return res.status(404).send('Practice entry not found');
        res.json(practice);
    } catch (err) {
        console.error('Error fetching practice entry:', err);
        res.status(500).send('Server error');
    }
};

const updatePractice = async (req, res) => {
    const { id } = req.params;
    const { post_title, content, cover_img, description } = req.body;
    try {
        const practice = await Practice.findByPk(id);
        if (!practice) return res.status(404).send('Practice entry not found');
        await practice.update({ post_title, content, cover_img, description });
        res.json({ message: 'Practice entry updated successfully' });
    } catch (err) {
        console.error('Error updating practice entry:', err);
        res.status(500).send('Server error');
    }
};

const deletePractice = async (req, res) => {
    const { id } = req.params;
    try {
        const practice = await Practice.findByPk(id);
        if (!practice) return res.status(404).send('Practice entry not found');
        await practice.destroy();
        res.json({ message: 'Practice entry deleted successfully' });
    } catch (err) {
        console.error('Error deleting practice entry:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createPractice,
    getAllPractices,
    getPracticeById,
    updatePractice,
    deletePractice,
};
