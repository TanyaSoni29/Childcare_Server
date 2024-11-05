const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db'); // Database connection

const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Received login request:", username, password);

    try {
        // Fetch user from database, limiting to one result
        const [rows] = await db.query('SELECT * FROM users WHERE username = ? ORDER BY id LIMIT 1', [username]);
        console.log("Database query result:", rows);

        // Check if user exists
        if (rows.length === 0) {
            console.log("User not found.");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = rows[0];
        console.log("Fetched user:", user);

        // Check if password matches the bcrypt hash in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Password mismatch.");
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, role: user.role || 'User' }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        console.log("Generated token:", token);
        res.json({ token });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { login };
