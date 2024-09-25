# Params vs Query Params

## When working with web development, particularly with HTTP requests, you'll often come across the terms **query parameters** and **route parameters (params)**. These are two ways to pass information to your application from a URL, but they serve different purposes and are used in different contexts

### 1. **Query Parameters**

- **Definition**: Query parameters are key-value pairs added to the end of a URL after a question mark (`?`). Multiple query parameters are separated by an ampersand (`&`).
- **Purpose**: They are generally used to filter or sort data on the server, or to provide additional options for a request.
- **Format**:

  ```plaintext
  http://example.com/resource?key1=value1&key2=value2
  ```

  - Here, `key1` and `key2` are query parameters with their respective values.
- **Example in Node.js (using `http` module)**:

  ```javascript
  const http = require('http');
  const url = require('url');

  http.createServer((req, res) => {
      const queryObject = url.parse(req.url, true).query;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(`Query Parameters: ${JSON.stringify(queryObject)}`);
  }).listen(8080);

  // Example request: http://localhost:8080/resource?name=John&age=30
  // Output: Query Parameters: {"name":"John","age":"30"}
  ```
  
### 2. **Route Parameters (Params)**

- **Definition**: Route parameters are part of the URL itself and are used to capture specific values in the URL path.
- **Purpose**: They are typically used to identify a specific resource or item. For example, identifying a user by their ID.
- **Format**:

  ```plaintext
  http://example.com/resource/:param1/:param2
  ```

  - In a framework like Express, you can define routes with parameters that match parts of the URL path.
- **Example in Express.js**:

  ```javascript
  const express = require('express');
  const app = express();

  app.get('/user/:id', (req, res) => {
      const userId = req.params.id;
      res.send(`User ID: ${userId}`);
  });

  app.listen(3000);

  // Example request: http://localhost:3000/user/123
  // Output: User ID: 123
  ```

### **Key Differences**

- **Position in URL**:
  - **Query Parameters**: Appear after the `?` in the URL.
  - **Route Parameters**: Appear directly in the path of the URL.
  
- **Usage**:
  - **Query Parameters**: Used for optional information like filters, sorts, or configurations.
  - **Route Parameters**: Used for required information that identifies a resource, such as an ID.

- **Multiple Values**:
  - **Query Parameters**: Can be easily added in any order and combined in a single URL.
  - **Route Parameters**: Fixed in the URL structure and are part of the defined route.

### **Practical Example**

Suppose you have a blog application:

- To view a specific post by its ID:

  ```plaintext
  http://example.com/posts/123
  ```

  Here, `123` is a route parameter that represents the post ID.
  
- To filter posts by category:

  ```plaintext
  http://example.com/posts?category=technology&sort=date
  ```

  Here, `category` and `sort` are query parameters used to filter and sort the posts.

### **Summary**

- **Query Parameters** are used to pass additional information to a resource that doesn't directly alter the resource's identity.
- **Route Parameters** are used to identify a specific resource within the URL path.

This distinction is crucial when designing routes and handling requests in web applications.
