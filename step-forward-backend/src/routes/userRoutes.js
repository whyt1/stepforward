// userRoutes.js

// This file defines the routes for user-related API endpoints.


const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/', userController.getAllUsers);

// POST a new user
router.post('/', userController.createUser);

// POST login
router.post('/login', userController.loginUser);

// GET a user by ID
router.get('/:id', userController.getUserById);

// PUT update a user by ID
router.put('/:id', userController.updateUser);

// DELETE a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;