# Query Parameter Routing

## What is req.query

In Express.js, `req.query` is an object that contains the query parameters of the request URL. Query parameters are a way to pass data to a server via the URL, typically used in GET requests. They come after the question mark `?` in the URL and are separated by ampersands `&`.

### **How Query Parameters Work**

When a client makes an HTTP request with query parameters, they are appended to the URL. For example:

```link
https://example.com/search?query=express&sort=asc
```

In this URL:

- `query` and `sort` are query parameters.
- `express` and `asc` are their respective values.

In an Express.js application, you can access these parameters using `req.query`.

### **Accessing Query Parameters**

Here's an example of how to use `req.query` in an Express route handler:

```javascript
const express = require('express');
const app = express();

// Define a route with a query parameter
app.get('/search', (req, res) => {
    // Access query parameters from req.query
    const query = req.query.query; // 'express'
    const sort = req.query.sort;   // 'asc'

    // Use the query parameters to perform some action
    res.send(`Search query: ${query}, Sort order: ${sort}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### **Example Usage**

**1. Sending a Request:**

If you visit `http://localhost:3000/search?query=express&sort=asc` in your browser or make a request using a tool like Postman, the server will handle the query parameters as follows:

**2. Handling Query Parameters:**

- `req.query.query` will be `'express'`
- `req.query.sort` will be `'asc'`

### **Handling Missing Parameters**

You can also handle cases where query parameters might be missing:

```javascript
app.get('/search', (req, res) => {
    const query = req.query.query || 'default'; // Provide a default value
    const sort = req.query.sort || 'desc'; // Provide a default value

    res.send(`Search query: ${query}, Sort order: ${sort}`);
});
```

### **Summary**

- **`req.query`**: An object containing query parameters from the URL.
- **Example**: For `https://example.com/search?query=express&sort=asc`, `req.query` will be `{ query: 'express', sort: 'asc' }`.
- **Usage**: Access query parameters to control the behavior of your application based on user input or other criteria.

Query parameters are a versatile way to pass additional data to your server, allowing you to build dynamic and interactive web applications.
