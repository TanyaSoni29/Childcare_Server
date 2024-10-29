/** @format */

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mysql = require('mysql2/promise'); // Using mysql2 for promise support
const db = require('./db/db');

// Routes import
const userGroupRoutes = require('./routes/usersGroups.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Test the database connection
db.getConnection()
	.then(() => console.log('Connected to the MySQL database successfully!'))
	.catch((err) =>
		console.error('Failed to connect to the MySQL database:', err)
	);

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/user-groups', userGroupRoutes);

// Example route to get all user groups

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
