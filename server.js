/** @format */

// Load environment variables from the .env file
require('dotenv').config();
const express = require('express'); // Import Express for creating the server
const cors = require('cors'); // Import CORS for handling cross-origin requests
const mysql = require('mysql2/promise'); // Import MySQL2 with promise support
const sequelize = require('./models/index'); // Import Sequelize instance for ORM
const db = require('./db/db'); // Import MySQL connection using db.js
const path = require('path'); // For handling file paths
const fileUpload = require('express-fileupload'); // Middleware for handling file uploads

// Import models and route handlers
const NewsEvent = require('./models/newsEvent.model'); // Sequelize model for NewsEvent
const userGroupRoutes = require('./routes/usersGroups.route'); // Routes for user groups
const newsEventRoutes = require('./routes/newsEvents.route'); // Routes for news events
const blogRoutes = require('./routes/blog.route'); // Routes for blog management
const authRoutes = require('./routes/auth.route'); // Routes for authentication (login)
const userRoutes = require('./routes/user.route'); // Routes for managing users
const actionPlanRoutes = require('./routes/actionPlans.route');
// Import authentication and authorization middleware
const {
	authenticateToken,
	authorizeRoles,
} = require('./middleware/auth.middleware'); // Custom middleware for authentication and role-based authorization

const app = express(); // Initialize the Express app
const PORT = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

// Enable CORS to handle requests from different origins (e.g., frontend)
app.use(
	cors({
		origin: '*', // Allow all origins
		methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
		allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
	})
);

// Enable file upload with express-fileupload middleware
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' })); // Temporary directory for storing files

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Serve static files (like images) from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test the MySQL connection (for non-Sequelize routes)
db.getConnection()
	.then(() => console.log('Connected to the MySQL database successfully!')) // Log success message if connected
	.catch((err) =>
		console.error('Failed to connect to the MySQL database:', err)
	); // Log error if connection fails

// Sync Sequelize models with the database
sequelize
	.sync({ alter: true }) // `alter: true` makes changes to match the model schema
	.then(() => console.log('Database synchronized successfully!')) // Log success if sync is successful
	.catch((err) => console.error('Failed to sync database:', err)); // Log error if sync fails

// Public route for authentication (e.g., login)
app.use('/auth', authRoutes); // Login route for user authentication

// Route for managing users
app.use('/users', userRoutes); // Routes for managing users

// Protected routes requiring token and role-based access control

// Routes for user groups, accessible only by Admin users
app.use(
	'/user-groups',
	authenticateToken, // Middleware to authenticate the token
	authorizeRoles(['Admin']), // Only Admins can access this route
	userGroupRoutes
);

// Example protected route only accessible by Admin role
app.get('/admin', authenticateToken, authorizeRoles(['Admin']), (req, res) => {
	res.json({ message: 'Welcome, Admin!' }); // Respond with a welcome message for Admins
});

// Example protected route accessible by Admin and Coach roles
app.get(
	'/coach',
	authenticateToken,
	authorizeRoles(['Admin', 'Coach']),
	(req, res) => {
		res.json({ message: 'Welcome, Coach!' }); // Respond with a welcome message for Admins and Coaches
	}
);

// Example protected route accessible by Admin, Coach, and Member roles
app.get(
	'/member',
	authenticateToken,
	authorizeRoles(['Admin', 'Coach', 'Member']),
	(req, res) => {
		res.json({ message: 'Welcome, Member!' }); // Respond with a welcome message for Admins, Coaches, and Members
	}
);

// Register additional routes (not necessarily protected)

// Route for managing news events, using Sequelize model
app.use('/news-events', newsEventRoutes); // Routes for handling CRUD operations on news events

// Route for managing blog entries
app.use('/blog', blogRoutes);

app.use('/action-plans', actionPlanRoutes); // Routes for managing blog entries

// Start the Express server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`); // Log the URL where the server is running
});
