# http in Nodejs 1

## give me http   uses using node and describe all basic web key words like queryparams, endpoint ,route ,params and give example only with http package not with express server and also give me fully comparison between route and endpoint

Let's explore how to use the `http` package in Node.js to handle basic HTTP operations, and understand key web concepts like query parameters, endpoints, routes, and params.

### **Using `http` Package in Node.js**

The `http` package in Node.js is used to create a simple web server that can handle HTTP requests and responses. Below is an example of how to create a basic server and respond to different requests.

#### **Basic HTTP Server Example:**

```javascript
const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
    // Parse the URL
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Get the path and query parameters
    const path = url.pathname;
    const queryParams = url.searchParams;

    // Handle different routes
    if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the home page!');
    } else if (path === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is the about page.');
    } else if (path === '/greet') {
        const name = queryParams.get('name') || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello, ${name}!`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Server listens on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

### **Key Web Terminologies:**

1. **Endpoint:**
   - **Definition:** An endpoint is a specific URL where a resource or service is accessible. It defines where and how an API can be accessed by clients.
   - **Example in the Code:** The `path` in the URL, like `/` for the home page or `/about` for the about page, represents different endpoints.

2. **Route:**
   - **Definition:** A route is a specific path associated with a method (e.g., GET, POST) on the server. It defines what should happen when a certain URL is requested.
   - **Example in the Code:** The different `if` conditions in the server code define routes for `/`, `/about`, and `/greet`.

3. **Query Parameters:**
   - **Definition:** Query parameters are key-value pairs that appear after the `?` in a URL. They are used to pass additional data to the server.
   - **Example in the Code:** In `/greet?name=John`, `name=John` is a query parameter. The code retrieves the value using `queryParams.get('name')`.

4. **Params:**
   - **Definition:** Params generally refer to dynamic parts of the URL path that can change based on the request (often referred to as "route parameters").
   - **Example:** If you had a route like `/user/:id`, `id` would be a param that could vary for different users (e.g., `/user/123`).

### **Comparison Between Route and Endpoint:**

- **Route:**
  - **Definition:** A route is associated with a specific HTTP method (like GET, POST) and defines the server-side behavior for a specific path.
  - **Example:** In a Node.js server, the route might be `/greet`, which handles GET requests and responds with a greeting message.

- **Endpoint:**
  - **Definition:** An endpoint is the specific URL where an API resource is available, representing the location of a service or data.
  - **Example:** `http://localhost:3000/greet` is an endpoint that could serve a greeting message.

**Comparison:**

- **Routes** are used to define how the server should respond to different endpoints. For example, the route `/greet` might define what happens when the endpoint `http://localhost:3000/greet` is accessed via a GET request.
- **Endpoints** represent the actual URLs that clients will interact with, and these URLs map to routes defined on the server.

### **Detailed Example with Query Parameters and Routes:**

Let's expand the example to demonstrate more complex route handling:

```javascript
const http = require('http');

// Create a server object
const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const queryParams = url.searchParams;

    if (path === '/greet' && req.method === 'GET') {
        const name = queryParams.get('name') || 'Guest';
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello, ${name}!`);
    } else if (path === '/greet' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = new URLSearchParams(body);
            const name = data.get('name') || 'Guest';
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Hello, ${name}! (Posted)`);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Server listens on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

### **Summary**

- **HTTP Server:** Created using Node.js's `http` package.
- **Endpoint:** The specific URL where a resource or service is available (e.g., `/greet`).
- **Route:** The server-side logic associated with handling requests to a specific endpoint (e.g., GET `/greet`).
- **Query Parameters:** Key-value pairs passed in the URL after the `?` symbol (e.g., `?name=John`).
- **Params:** Dynamic segments in the URL path (e.g., `/user/:id`).

By understanding these concepts, you can effectively build and manage basic web servers using Node.js without relying on frameworks like Express.
