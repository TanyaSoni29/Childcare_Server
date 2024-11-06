/** @format */

const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating JWT tokens
const db = require('../db/db');
const User = require('../models/user.model');
const { Op } = require('sequelize'); // Import the database connection
require('dotenv').config(); // Load environment variables from .env file

// Login function to authenticate a user
const login = async (req, res) => {
	const { username, password } = req.body; // Destructure username and password from the request body
	console.log('Received login request:', username, password); // Log the received username and password (useful for debugging)

	try {
		// Fetch user from the database, limiting to one result
		const [rows] = await db.query(
			'SELECT * FROM users WHERE username = ? ORDER BY id LIMIT 1',
			[username]
		);
		console.log('Database query result:', rows); // Log the result of the database query

		// Check if the user exists in the database
		if (rows.length === 0) {
			console.log('User not found.'); // Log if no user is found
			return res.status(401).json({ message: 'Invalid username or password' }); // Respond with a 401 status if the user is not found
		}

		const user = rows[0]; // Get the first user from the result (as we expect only one result due to LIMIT 1)
		console.log('Fetched user:', user); // Log the fetched user details

		// Compare the provided password with the hashed password stored in the database
		const isPasswordValid = await bcrypt.compare(password, user.password);
		console.log('Password valid:', isPasswordValid); // Log whether the password is valid

		// If the password is invalid, return an error response
		if (!isPasswordValid) {
			console.log('Password mismatch.'); // Log the mismatch
			return res.status(401).json({ message: 'Invalid username or password' }); // Respond with a 401 status for invalid credentials
		}

		// Generate a JWT token with the user's id and role
		const token = jwt.sign(
			{ id: user.id, role: user.role || 'User' }, // Payload containing user ID and role (default to 'User' if role is not set)
			process.env.JWT_SECRET, // Secret key for signing the JWT, loaded from environment variables
			{
				expiresIn: '1h', // Set token expiration to 1 hour
			}
		);

		console.log('Generated token:', token); // Log the generated token for debugging
		res.json({ token }); // Send the token as the response to the client
	} catch (err) {
		console.error('Error logging in user:', err); // Log any errors that occur during the login process
		res.status(500).json({ message: 'Server error' }); // Respond with a 500 status if an error occurs on the server
	}
};

const register = async (req, res) => {
	const { username, email, password, confirmPassword } = req.body;
	console.log('Received registration request:', username, email);

	try {
		// Validate password and confirmPassword
		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Passwords do not match' });
		}

		// Check if the username or email already exists
		const existingUser = await User.findOne({
			where: {
				[Op.or]: [{ username: username }, { email: email }],
			},
		});

		if (existingUser) {
			return res
				.status(400)
				.json({ message: 'Username or email already exists' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user in the database using Sequelize
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
			category_id: 4, // Set category_id to 4 by default
		});

		// Generate a JWT token for the new user
		const token = jwt.sign(
			{ id: newUser.id, role: 'User' },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		console.log('User registered successfully:', newUser.id);
		res.status(201).json({ message: 'User registered successfully', token });
	} catch (err) {
		console.error('Error registering user:', err);
		res.status(500).json({ message: 'Server error' });
	}
};

module.exports = { login, register };
