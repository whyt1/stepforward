// userController.js

// This file defines the controller logic for user-related API endpoints.
// It handles requests, interacts with the 'User' model (using Mongoose for MongoDB),
// and sends back responses.

const User = require('../models/user'); // Adjust path as needed

// Get all users
exports.getAllUsers = async (req, res) => {
    console.log("getAllUsers")
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    console.log("createUser")
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    console.log("getUserById")
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    console.log("updateUser")
    const { name, email } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};

// Log in user
exports.loginUser = async (req, res) => {
    console.log("loginUser")
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    console.log("deleteUser")
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
};
