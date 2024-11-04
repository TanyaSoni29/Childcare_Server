/** @format */

require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mysql = require('mysql2/promise'); // Using mysql2 for promise support
const sequelize = require('./models/index'); // Import Sequelize instance
const db = require('./db/db'); // Existing MySQL connection
const NewsEvent = require('./models/newsEvent.model'); // Import the NewsEvent model
const userGroupRoutes = require('./routes/usersGroups.route'); // Existing routes
const newsEventRoutes = require('./routes/newsEvents.route'); // New route for news events
const blogRoutes = require('./routes/blog.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Test the MySQL connection (for non-Sequelize routes)
db.getConnection()
	.then(() => console.log('Connected to the MySQL database successfully!'))
	.catch((err) =>
		console.error('Failed to connect to the MySQL database:', err)
	);

// Sync Sequelize models (creates tables if they don't exist)
sequelize
	.sync({ alter: true })
	.then(() => console.log('Database synchronized successfully!'))
	.catch((err) => console.error('Failed to sync database:', err));

// Register routes
app.use('/user-groups', userGroupRoutes); // Existing route using MySQL connection
app.use('/news-events', newsEventRoutes); // New route using Sequelize
app.use('/blog', blogRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
