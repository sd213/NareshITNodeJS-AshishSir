# What is the use of app.use(urlencoded({ extended: true })) app.use(json()); app.use(cors());

## The code you provided is typically part of a Node.js application using the Express framework to set up middleware for handling different types of requests. Here's a breakdown of each middleware function:

### Code Explanation

```javascript
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
```

### 1. `urlencoded({ extended: true })`

- **Purpose**: Parses incoming requests with URL-encoded payloads. This is useful when you're dealing with form submissions.
- **`extended: true`**: Allows for nested objects (using the `qs` library), enabling more complex data structures.
- **Example**:
  - Request body with `extended: true`:

    ```plaintext
    name=John&address[city]=NewYork
    ```

    This would result in a nested object:

    ```json
    {
      "name": "John",
      "address": {
        "city": "NewYork"
      }
    }
    ```

### 2. `json()`

- **Purpose**: Parses incoming requests with JSON payloads. It's necessary when you want to handle JSON in your requests (like `POST` or `PUT` requests).
- **Example**:
  - JSON request body:

    ```json
    {
      "name": "John",
      "age": 30
    }
    ```

    This middleware parses the request so that `req.body` in your routes will contain the object `{ name: "John", age: 30 }`.

### 3. `cors()`

- **Purpose**: Enables **Cross-Origin Resource Sharing** (CORS), which allows your app to handle requests from different origins (domains). Without CORS, your app might reject requests from frontend clients on different domains.
- **Usage**: By default, this middleware allows all origins. You can restrict it by configuring the `cors()` function with specific options.
- **Example**:
  - Enabling CORS for specific origin:

    ```javascript
    app.use(cors({ origin: 'https://example.com' }));
    ```

### Sample Usage in Express

```javascript
const express = require('express');
const cors = require('cors');
const { json, urlencoded } = require('express');

const app = express();

// Middleware setup
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

// Example route
app.post('/submit', (req, res) => {
    console.log(req.body); // Parsed body will be available here
    res.send('Form data received');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

### Summary

- `urlencoded({ extended: true })`: Handles URL-encoded form data.
- `json()`: Handles JSON data.
- `cors()`: Enables Cross-Origin Resource Sharing.

This setup is common for building REST APIs with Express in Node.js applications. Let me know if you'd like further customization!
