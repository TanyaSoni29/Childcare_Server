
const db = require('../db/db'); // Import the database connection

const createUserGroups = async (req, res) => {
	const { name, parent_id, privileges, sort_order, status } = req.body;
	try {
		const [result] = await db.query(
			'INSERT INTO user_groups (name, parent_id, privileges, sort_order, status) VALUES (?, ?, ?, ?, ?)',
			[name, parent_id, privileges, sort_order, status]
		);
		res.status(201).json({
			id: result.insertId,
			name,
			parent_id,
			privileges,
			sort_order,
			status,
		});
	} catch (err) {
		console.error('Error inserting user group:', err);
		res.status(500).send('Server error');
	}
};

// Controller to get all user groups
const getAllUserGroups = async (req, res) => {
	try {
		const [rows] = await db.query('SELECT * FROM user_groups');
		res.json(rows);
	} catch (err) {
		console.error('Error fetching user groups:', err);
		res.status(500).send('Server error');
	}
};

// Controller to get a single user group by ID
const getUserGroupById = async (req, res) => {
	const { id } = req.params;
	try {
		const [rows] = await db.query('SELECT * FROM user_groups WHERE id = ?', [
			id,
		]);
		if (rows.length === 0) {
			return res.status(404).send('User group not found');
		}
		res.json(rows[0]);
	} catch (err) {
		console.error('Error fetching user group:', err);
		res.status(500).send('Server error');
	}
};

const deleteUserGroup = async (req, res) => {
	const { id } = req.params;
	try {
		const [result] = await db.query('DELETE FROM user_groups WHERE id = ?', [
			id,
		]);
		if (result.affectedRows === 0) {
			return res.status(404).send('User group not found');
		}
		res.json({ message: 'User group deleted successfully' });
	} catch (err) {
		console.error('Error deleting user group:', err);
		res.status(500).send('Server error');
	}
};

module.exports = {
	getAllUserGroups,
	getUserGroupById,
	createUserGroups,
	deleteUserGroup,
};
