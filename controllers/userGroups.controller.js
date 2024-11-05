const db = require('../db/db'); // Import the database connection

// Controller to create a new user group
const createUserGroups = async (req, res) => {
	const { name, parent_id, privileges, sort_order, status } = req.body; // Destructure necessary fields from request body
	try {
		// Insert a new user group into the database
		const [result] = await db.query(
			'INSERT INTO user_groups (name, parent_id, privileges, sort_order, status) VALUES (?, ?, ?, ?, ?)',
			[name, parent_id, privileges, sort_order, status] // Parameterized query values for security
		);

		// Respond with the created user group details and the new ID
		res.status(201).json({
			id: result.insertId, // The ID of the newly created user group
			name,
			parent_id,
			privileges,
			sort_order,
			status,
		});
	} catch (err) {
		console.error('Error inserting user group:', err); // Log any error that occurs during insertion
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message if something fails
	}
};

// Controller to fetch all user groups
const getAllUserGroups = async (req, res) => {
	try {
		// Execute a query to select all rows from the user_groups table
		const [rows] = await db.query('SELECT * FROM user_groups');
		res.json(rows); // Respond with the retrieved user groups as JSON
	} catch (err) {
		console.error('Error fetching user groups:', err); // Log any error that occurs during fetching
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message if something fails
	}
};

// Controller to fetch a single user group by its ID
const getUserGroupById = async (req, res) => {
	const { id } = req.params; // Extract the ID from the request parameters
	try {
		// Execute a query to select the user group with the specified ID
		const [rows] = await db.query('SELECT * FROM user_groups WHERE id = ?', [
			id, // Parameterized query for security
		]);
		
		// Check if the user group was found
		if (rows.length === 0) {
			return res.status(404).send('User group not found'); // Send a 404 status if no user group is found
		}

		res.json(rows[0]); // Respond with the found user group details
	} catch (err) {
		console.error('Error fetching user group:', err); // Log any error that occurs during fetching
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message if something fails
	}
};

// Controller to delete a user group by its ID
const deleteUserGroup = async (req, res) => {
	const { id } = req.params; // Extract the ID from the request parameters
	try {
		// Execute a query to delete the user group with the specified ID
		const [result] = await db.query('DELETE FROM user_groups WHERE id = ?', [
			id, // Parameterized query for security
		]);
		
		// Check if any row was deleted
		if (result.affectedRows === 0) {
			return res.status(404).send('User group not found'); // Send a 404 status if no user group is found
		}

		res.json({ message: 'User group deleted successfully' }); // Respond with a success message
	} catch (err) {
		console.error('Error deleting user group:', err); // Log any error that occurs during deletion
		res.status(500).send('Server error'); // Send a 500 status with "Server error" message if something fails
	}
};

// Export the controllers for use in routes or other parts of the application
module.exports = {
	getAllUserGroups,
	getUserGroupById,
	createUserGroups,
	deleteUserGroup,
};
