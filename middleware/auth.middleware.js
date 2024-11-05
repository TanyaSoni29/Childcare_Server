const jwt = require('jsonwebtoken'); // Import jsonwebtoken for handling JWT operations

// Middleware function to authenticate a token
const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']; // Get the 'Authorization' header from the request
	const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header if it exists

	// If no token is provided, return a 401 (Unauthorized) response
	if (!token) return res.status(401).json({ message: 'Access token required' });

	// Verify the token using the secret key
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		// If token verification fails, return a 403 (Forbidden) response
		if (err) return res.status(403).json({ message: 'Invalid token' });

		// If token is valid, attach the decoded user info to the request object
		req.user = user;
		next(); // Proceed to the next middleware or route handler
	});
};

// Middleware function for role-based access control
const authorizeRoles = (roles) => (req, res, next) => {
	// Check if the user's role is included in the allowed roles
	if (!roles.includes(req.user.role)) {
		// If the role is not allowed, return a 403 (Forbidden) response
		return res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
	}
	next(); // If the role is allowed, proceed to the next middleware or route handler
};

// Export the middleware functions for use in routes
module.exports = { authenticateToken, authorizeRoles };
