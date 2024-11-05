require('dotenv').config(); // Load environment variables from a .env file into process.env
const mysql = require('mysql2/promise'); // Import mysql2 with promise support for async/await

// Create a connection pool to the MySQL database
const db = mysql.createPool({
	host: process.env.DB_HOST, // Database host, loaded from environment variables
	user: process.env.DB_USER, // Database username, loaded from environment variables
	password: process.env.DB_PASSWORD, // Database password, loaded from environment variables
	database: process.env.DB_NAME, // Database name, loaded from environment variables
	port: process.env.DB_PORT, // Database port, loaded from environment variables
});

// Export the database connection pool for use in other parts of the application
module.exports = db;
