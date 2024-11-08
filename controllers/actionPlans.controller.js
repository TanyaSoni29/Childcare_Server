/** @format */

const ActionPlan = require('../models/actionPlans.model');
const User = require('../models/user.model'); // Assuming the User model is set up correctly

// Create a new action plan
exports.createActionPlan = async (req, res) => {
	try {
		const { user_id, coach_id, date, summary, description } = req.body;
		const actionPlan = await ActionPlan.create({
			user_id,
			coach_id,
			date,
			summary,
			description,
		});
		res.status(201).json(actionPlan);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create action plan' });
	}
};

// Get all action plans
exports.getAllActionPlans = async (req, res) => {
	try {
		const actionPlans = await ActionPlan.findAll({
			include: [
				{
					model: User,
					as: 'user', // Aliased if necessary
					attributes: ['id', 'username', 'firstname', 'lastname'], // Include desired user attributes
				},
				{
					model: User,
					as: 'coach',
					attributes: ['id', 'username', 'firstname', 'lastname'],
				},
			],
		});
		res.json(actionPlans);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch action plans' });
	}
};

// Get a single action plan by ID
exports.getActionPlanById = async (req, res) => {
	try {
		const { id } = req.params;
		const actionPlan = await ActionPlan.findByPk(id, {
			include: [
				{
					model: User,
					as: 'user',
					attributes: ['id', 'username', 'firstname', 'lastname'],
				},
				{
					model: User,
					as: 'coach',
					attributes: ['id', 'username', 'firstname', 'lastname'],
				},
			],
		});
		if (!actionPlan)
			return res.status(404).json({ error: 'Action plan not found' });
		res.json(actionPlan);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch action plan' });
	}
};

// Update an action plan by ID
exports.updateActionPlan = async (req, res) => {
	try {
		const { id } = req.params;
		const { user_id, coach_id, date, summary, description } = req.body;
		const actionPlan = await ActionPlan.findByPk(id);
		if (!actionPlan)
			return res.status(404).json({ error: 'Action plan not found' });

		await actionPlan.update({ user_id, coach_id, date, summary, description });
		res.json(actionPlan);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update action plan' });
	}
};

// Delete an action plan by ID
exports.deleteActionPlan = async (req, res) => {
	try {
		const { id } = req.params;
		const actionPlan = await ActionPlan.findByPk(id);
		if (!actionPlan)
			return res.status(404).json({ error: 'Action plan not found' });

		await actionPlan.destroy();
		res.json({ message: 'Action plan deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to delete action plan' });
	}
};
