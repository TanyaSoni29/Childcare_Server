/** @format */

// Load environment variables from .env
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const mysql = require('mysql2/promise'); // MySQL for database connection
const sequelize = require('./models/index'); // Sequelize instance for ORM
const db = require('./db/db'); // Existing MySQL connection using db.js

// Import models and routes
const NewsEvent = require('./models/newsEvent.model'); // Sequelize model
const userGroupRoutes = require('./routes/usersGroups.route'); // User group routes
const newsEventRoutes = require('./routes/newsEvents.route'); // News events routes
const blogRoutes = require('./routes/blog.route'); // Blog routes
const authRoutes = require('./routes/auth.route'); // Auth routes for login

// Import authentication middleware
const {
	authenticateToken,
	authorizeRoles,
} = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for requests from the frontend
app.use(cors());

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
app.use('/auth', authRoutes); // Login route for authentication

// Protected routes
app.use(
	'/user-groups',
	authenticateToken,
	authorizeRoles(['Admin']),
	userGroupRoutes
); // Only accessible by Admin

// Example protected routes with role-based access
app.get('/admin', authenticateToken, authorizeRoles(['Admin']), (req, res) => {
	res.json({ message: 'Welcome, Admin!' });
});

app.get(
	'/coach',
	authenticateToken,
	authorizeRoles(['Admin', 'Coach']),
	(req, res) => {
		res.json({ message: 'Welcome, Coach!' });
	}
);

app.get(
	'/member',
	authenticateToken,
	authorizeRoles(['Admin', 'Coach', 'Member']),
	(req, res) => {
		res.json({ message: 'Welcome, Member!' });
	}
);

// Register additional routes (unprotected or protected separately if needed)
app.use('/news-events', newsEventRoutes); // Example of Sequelize-based route
app.use('/blog', blogRoutes); // Blog routes

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
