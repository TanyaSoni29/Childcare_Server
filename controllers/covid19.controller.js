const Covid19 = require('../models/covid19.model');

const createCovid19 = async (req, res) => {
    const { post_title, content, cover_img, description } = req.body;
    try {
        const covid19 = await Covid19.create({ post_title, content, cover_img, description });
        res.status(201).json(covid19);
    } catch (err) {
        console.error('Error creating Covid-19 entry:', err);
        res.status(500).send('Server error');
    }
};

const getAllCovid19s = async (req, res) => {
    try {
        const covid19s = await Covid19.findAll();
        res.json(covid19s);
    } catch (err) {
        console.error('Error fetching Covid-19 entries:', err);
        res.status(500).send('Server error');
    }
};

const getCovid19ById = async (req, res) => {
    const { id } = req.params;
    try {
        const covid19 = await Covid19.findByPk(id);
        if (!covid19) return res.status(404).send('Covid-19 entry not found');
        res.json(covid19);
    } catch (err) {
        console.error('Error fetching Covid-19 entry:', err);
        res.status(500).send('Server error');
    }
};

const updateCovid19 = async (req, res) => {
    const { id } = req.params;
    const { post_title, content, cover_img, description } = req.body;
    try {
        const covid19 = await Covid19.findByPk(id);
        if (!covid19) return res.status(404).send('Covid-19 entry not found');
        await covid19.update({ post_title, content, cover_img, description });
        res.json({ message: 'Covid-19 entry updated successfully' });
    } catch (err) {
        console.error('Error updating Covid-19 entry:', err);
        res.status(500).send('Server error');
    }
};

const deleteCovid19 = async (req, res) => {
    const { id } = req.params;
    try {
        const covid19 = await Covid19.findByPk(id);
        if (!covid19) return res.status(404).send('Covid-19 entry not found');
        await covid19.destroy();
        res.json({ message: 'Covid-19 entry deleted successfully' });
    } catch (err) {
        console.error('Error deleting Covid-19 entry:', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    createCovid19,
    getAllCovid19s,
    getCovid19ById,
    updateCovid19,
    deleteCovid19,
};
