# Middleware 3

## **Understanding Middleware in Express.js**

Middleware functions are essential components in Express.js, allowing you to handle and manipulate requests and responses, execute code, and manage the control flow of the application. In this section, we'll delve deeper into how middleware works, how to use it, and the role of the `next()` function.

### **How Middleware Works**

In Express.js, middleware functions are executed in the order they are defined. A middleware function can perform tasks like:

- Executing any code.
- Making changes to the `req` and `res` objects.
- Ending the request-response cycle.
- Calling the next middleware function in the stack using `next()`.

If a middleware function does not end the request-response cycle or call `next()`, the request will hang, and the client will not receive a response.

### **Types of Middleware with Examples**

#### **1. Application-Level Middleware**

Application-level middleware is bound to an instance of the Express application using `app.use()` or route-specific methods like `app.get()`, `app.post()`, etc.

##### **Example: Logging Middleware**

```javascript
const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Pass control to the next middleware function
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example, the logging middleware logs the HTTP method and URL for each incoming request and then passes control to the next middleware or route handler using `next()`.

#### **2. Router-Level Middleware**

Router-level middleware is bound to an instance of an Express router using `router.use()` or route-specific methods like `router.get()`.

##### **Example: Authentication Middleware**

```javascript
const express = require('express');
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
    if (req.headers['authorization'] === 'secret-token') {
        next(); // User is authenticated, proceed to the next middleware
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.get('/dashboard', (req, res) => {
    res.send('Welcome to the dashboard!');
});

const app = express();
app.use('/user', router);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example, the authentication middleware checks for a specific token in the request headers. If the token is present, it calls `next()` to proceed; otherwise, it sends a `401 Unauthorized` response.

#### **3. Error-Handling Middleware**

Error-handling middleware is used to catch and manage errors that occur during the request-response cycle. It must have four parameters: `err`, `req`, `res`, and `next`.

##### **Example: Basic Error Handler**

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    throw new Error('Something went wrong!');
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example, if an error occurs (like the one thrown in the root route), the error-handling middleware catches it, logs the stack trace, and sends a `500 Internal Server Error` response.

#### **4. Built-In Middleware**

Express.js provides built-in middleware functions for common tasks like serving static files, parsing request bodies, etc.

##### **Example: Serving Static Files**

```javascript
const express = require('express');
const app = express();

// Built-in middleware for serving static files
app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example, the `express.static` middleware serves static files from the `public` directory.

#### **5. Third-Party Middleware**

You can use middleware provided by third-party libraries to extend the functionality of your Express app.

##### **Example: Morgan for Logging**

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

// Third-party middleware for logging
app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example, `morgan` is a third-party middleware that logs HTTP requests in the "tiny" format.

#### **6. Custom Middleware**

You can create custom middleware to perform specific tasks, such as logging, authentication, or validation.

##### **Example: Request Time Logger**

```javascript
const express = require('express');
const app = express();

// Custom middleware to log the request time
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log('Request Time:', req.requestTime);
    next();
});

app.get('/', (req, res) => {
    res.send(`Hello, World! Requested at: ${new Date(req.requestTime)}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

In this example, the custom middleware adds a `requestTime` property to the `req` object, which is then used in the route handler.

### **Understanding `next()`**

The `next()` function is a key component of middleware. It controls the flow of middleware functions by calling the next function in the middleware stack.

- **Calling `next()`:** When `next()` is called, the next middleware function in the stack is executed. If no middleware is left, the request is passed to the route handler.
  
- **Skipping Middleware:** If `next()` is not called, the request-response cycle is terminated, and no further middleware is executed.

- **Passing Errors:** You can pass an error to the next middleware by calling `next(err)`. This will skip any remaining non-error-handling middleware and pass control to the error-handling middleware.

#### **Example: Middleware with Error Handling**

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res, next) => {
    console.log('Second middleware');
    // Simulate an error
    const err = new Error('Something went wrong');
    next(err); // Pass the error to the next middleware
});

app.use((req, res, next) => {
    console.log('This will not be logged');
    next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Error encountered:', err.message);
    res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### **Summary**

- **Middleware** functions are the backbone of Express.js, allowing you to handle requests, modify responses, and control the flow of your application.
- **Types of Middleware:**
  - **Application-Level Middleware:** Applies globally to the application.
  - **Router-Level Middleware:** Applies to specific routes or routers.
  - **Error-Handling Middleware:** Catches and handles errors in the application.
  - **Built-In Middleware:** Provided by Express.js for common tasks like static file serving and request parsing.
  - **Third-Party Middleware:** Middleware provided by external libraries to extend functionality.
  - **Custom Middleware:** User-defined middleware tailored to specific application needs.
- **`next()` Function:** Controls the flow of middleware, allowing you to move to the next function in the stack or handle errors by passing them to the next error-handling middleware.

Middleware is a powerful and flexible feature of Express.js that allows you to create modular, maintainable, and scalable web applications. Understanding how to use and chain middleware effectively is crucial for building robust applications.
