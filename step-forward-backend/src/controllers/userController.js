// userController.js

// This file defines the controller logic for user-related API endpoints.
// It handles requests, interacts with the 'User' model (which would be
// defined separately for database operations, e.g., using Mongoose for MongoDB),
// and sends back responses.

const users = []; // In-memory user storage for demonstration

// Get all users
exports.getAllUsers = (req, res) => {
    res.status(200).json(users);
};

// Create a new user
exports.createUser = (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required.' });
    }
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
};

// Get a user by ID
exports.getUserById = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
};

// Update a user by ID
exports.updateUser = (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    res.status(200).json(user);
};

// Delete a user by ID
exports.deleteUser = (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found.' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
};

