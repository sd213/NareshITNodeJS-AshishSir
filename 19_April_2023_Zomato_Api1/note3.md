# how to pass auth keys as headers and how to generate one for each user request

To pass authentication keys as headers in a Node.js application using `async/await`, we'll implement two common methods: **JWT (JSON Web Tokens)** and **API Keys**. This guide will demonstrate how to do this in a clear, step-by-step manner without using callbacks.

### 1. **Passing JWT as an Authorization Header**

#### **Step-by-Step Implementation**

1. **Install Required Packages**:
   First, ensure you have `express` and `jsonwebtoken` installed in your Node.js project.

   ```bash
   npm install express jsonwebtoken
   ```

2. **Set Up Your Express Application**:
   Create a simple Express server with routes for login (to generate the JWT) and a protected route to demonstrate passing the token as a header.

#### Example Code

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Secret key for signing JWT tokens
const secretKey = 'your_secret_key';

// Route to login and generate JWT token
app.post('/login', async (req, res) => {
    try {
        const user = { id: 1, username: 'exampleUser' }; // Mock user data

        // Generate a JWT token with a 1-hour expiry
        const token = await jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        // Respond with the generated token
        return res.json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Error generating token' });
    }
});

// Middleware to verify JWT tokens
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const user = await jwt.verify(token, secretKey); // Verify the token
        req.user = user; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

// Protected route
app.get('/protected', authenticateToken, async (req, res) => {
    return res.json({ message: 'Protected data', user: req.user });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

### 2. **Passing API Key as a Header**

#### **Step-by-Step Implementation**

1. **Install Required Package** (if not already installed):
   No extra packages are needed, as we will only use Express.

2. **Set Up Your Express Application**:
   Create another route to generate and verify an API key.

#### Example Code

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Function to generate a random API key
const generateApiKey = () => {
    return crypto.randomBytes(30).toString('hex'); // Generates a 60-character API key
};

// Store users and their API keys (in a real application, this would be in a database)
const users = {};

// Route to register a user and generate an API key
app.post('/register', async (req, res) => {
    try {
        const apiKey = generateApiKey();
        const userId = Date.now(); // Using timestamp as a mock user ID for this example

        // Store user and API key in our users object
        users[userId] = { apiKey };

        // Respond with the generated API key
        return res.json({ apiKey });
    } catch (error) {
        return res.status(500).json({ error: 'Error generating API key' });
    }
});

// Middleware to verify API keys
const authenticateApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Get API key from headers

    if (!apiKey) {
        return res.status(401).json({ error: 'API key missing' });
    }

    try {
        // Check if the API key exists in our users object
        const user = Object.values(users).find(user => user.apiKey === apiKey);
        if (!user) {
            return res.status(403).json({ error: 'Invalid API key' });
        }

        req.user = user; // Attach user info to request object
        next(); // Proceed to next middleware or route handler
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

// Protected route using API key
app.get('/protected', authenticateApiKey, async (req, res) => {
    return res.json({ message: 'Protected data', user: req.user });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

### Summary of Key Parts

1. **JWT Authentication**:
   - **Login Route**: Generates a JWT token when the user logs in.
   - **Authorization Header**: The client sends the token as `Authorization: Bearer <token>`.
   - **Middleware**: Verifies the token for protected routes.

2. **API Key Authentication**:
   - **Register Route**: Generates an API key when the user registers.
   - **Custom Header**: The client sends the API key as `x-api-key`.
   - **Middleware**: Checks the API key against stored keys for protected routes.

### Example Client-Side Usage

For **JWT**:

```javascript
// Client-side request with JWT
const token = '<your-jwt-token>'; // Replace with actual JWT token

fetch('http://localhost:3000/protected', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

For **API Key**:

```javascript
// Client-side request with API Key
const apiKey = '<your-api-key>'; // Replace with actual API key

fetch('http://localhost:3000/protected', {
    method: 'GET',
    headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Conclusion

You can implement both JWT and API Key authentication methods in a Node.js application using `async/await` for all asynchronous operations, avoiding the need for callbacks. This allows for cleaner, more readable code while ensuring secure API access.
