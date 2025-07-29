### Step 1: Set Up the Project

1. **Initialize the Project**:
   ```bash
   mkdir my-web-app-backend
   cd my-web-app-backend
   npm init -y
   ```

2. **Install Dependencies**:
   ```bash
   npm install express body-parser cors
   ```

3. **Create Directory Structure**:
   ```bash
   mkdir src
   cd src
   mkdir controllers routes
   touch app.js
   ```

### Step 2: Create the Express Server

In `src/app.js`, set up the Express server:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```

### Step 3: Create the User Controller

In `src/controllers/userController.js`, define the controller functions:

```javascript
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
```

### Step 4: Create the User Routes

In `src/routes/userRoutes.js`, define the routes:

```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET all users
router.get('/', userController.getAllUsers);

// POST a new user
router.post('/', userController.createUser);

// GET a user by ID
router.get('/:id', userController.getUserById);

// PUT update a user by ID
router.put('/:id', userController.updateUser);

// DELETE a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

### Step 5: Prepare for Postman Testing

#### API Endpoints

1. **GET /api/users**
   - **Success Response**:
     - **Code**: 200
     - **Content**: 
       ```json
       [
           { "id": 1, "name": "John Doe", "email": "john@example.com" }
       ]
       ```
   - **Failure Response**:
     - **Code**: 500
     - **Content**: 
       ```json
       { "message": "Internal Server Error" }
       ```

2. **POST /api/users**
   - **Request Body**:
     ```json
     { "name": "Jane Doe", "email": "jane@example.com" }
     ```
   - **Success Response**:
     - **Code**: 201
     - **Content**: 
       ```json
       { "id": 2, "name": "Jane Doe", "email": "jane@example.com" }
       ```
   - **Failure Response**:
     - **Code**: 400
     - **Content**: 
       ```json
       { "message": "Name and email are required." }
       ```

3. **GET /api/users/:id**
   - **Success Response**:
     - **Code**: 200
     - **Content**: 
       ```json
       { "id": 1, "name": "John Doe", "email": "john@example.com" }
       ```
   - **Failure Response**:
     - **Code**: 404
     - **Content**: 
       ```json
       { "message": "User not found." }
       ```

4. **PUT /api/users/:id**
   - **Request Body**:
     ```json
     { "name": "John Smith" }
     ```
   - **Success Response**:
     - **Code**: 200
     - **Content**: 
       ```json
       { "id": 1, "name": "John Smith", "email": "john@example.com" }
       ```
   - **Failure Response**:
     - **Code**: 404
     - **Content**: 
       ```json
       { "message": "User not found." }
       ```

5. **DELETE /api/users/:id**
   - **Success Response**:
     - **Code**: 204
   - **Failure Response**:
     - **Code**: 404
     - **Content**: 
       ```json
       { "message": "User not found." }
       ```

### Step 6: Run the Server

To run the server, execute the following command in your terminal:

```bash
node src/app.js
```

### Step 7: Testing with Postman

1. Open Postman.
2. Use the provided endpoints to test the API.
3. Set the request type (GET, POST, PUT, DELETE) and enter the URL (e.g., `http://localhost:3000/api/users`).
4. For POST and PUT requests, set the body to JSON and include the necessary fields.

### Conclusion

This setup provides a basic RESTful API using Node.js and Express, organized into controllers and routers. You can expand this structure by adding more features, such as database integration, authentication, and more complex business logic as needed.