const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const User = require("../models/user.model");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Replace the plain password with the hashed password
    const userData = { ...req.body, password: hashedPassword };

    const user = await User.create(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    // Check if the password is being updated
    let updatedData = req.body;
    if (req.body.password) {
      // Hash the new password before updating
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedData = { ...req.body, password: hashedPassword };
    }

    const [updated] = await User.update(updatedData, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCoaches = async (req, res) => {
  try {
    // Assuming `category_id` for coaches is 2, you can change this as needed
    const coaches = await User.findAll({
      where: { category_id: 3 }, // Adjust the category_id value as per your setup
    });

    res.json(coaches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getClients = async (req, res) => {
	try {
	  // Assuming `category_id` for clients is 4
	  const clients = await User.findAll({
		where: { category_id: 4 }, // Set category_id to 4 for clients
	  });
  
	  res.json(clients);
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  };
  
