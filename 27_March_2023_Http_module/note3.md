# Static API

## What is Static API

A **static API** refers to an API that serves fixed data or content that does not change dynamically based on the request. The data provided by a static API is predetermined, meaning the API's response is always the same for a given request. This is in contrast to a dynamic API, where the response might change based on user input, time, or other factors.

### **Key Characteristics of a Static API:**

1. **Fixed Content:**
   - The data served by a static API is static, meaning it does not change unless the underlying data or files are manually updated.

2. **No Backend Logic:**
   - Static APIs typically do not involve any backend logic, database queries, or processing. They often serve content directly from static files (like JSON files, HTML, or images).

3. **Efficient and Fast:**
   - Since the content is static, static APIs are often faster and more efficient because they do not require computation or data processing on the server side.

4. **Examples:**
   - Serving a list of countries from a static JSON file.
   - Providing documentation or help content stored as static HTML pages.
   - Serving configuration files or pre-defined datasets.

### **Example of a Static API**

Imagine you have a JSON file named `countries.json` with the following content:

```json
{
  "countries": [
    "USA",
    "Canada",
    "Mexico",
    "India",
    "China"
  ]
}
```

You could create a static API that serves this JSON file when requested:

```javascript
const http = require('http');
const fs = require('fs');

// Create an HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/api/countries' && req.method === 'GET') {
        fs.readFile('countries.json', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

// Specify the port and hostname
const hostname = '127.0.0.1';
const port = 3000;

// Start the server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
```

- **How it works:**
  - When you visit `http://127.0.0.1:3000/api/countries`, the server reads the `countries.json` file and returns its content as a JSON response.

### **Use Cases for Static APIs**

- **Documentation or FAQs:** Serving static content like help pages, documentation, or FAQs.
- **Configuration Data:** Providing static configuration files or pre-defined settings.
- **Small Datasets:** Serving small, fixed datasets that don’t require dynamic generation.

### **Static API vs. Dynamic API**

- **Static API:**
  - Serves the same content every time.
  - Simple, fast, and requires minimal server resources.
  - No backend processing, no database interactions.

- **Dynamic API:**
  - Serves content that can change based on the request (e.g., user input, time, or data in a database).
  - Typically involves backend processing, such as running code, querying a database, or generating content on-the-fly.

### **Summary**

A **static API** provides fixed, unchanging data in response to a request. It’s simple, fast, and efficient, making it ideal for serving static content or small datasets. Unlike dynamic APIs, static APIs do not involve any backend processing or dynamic data generation.
