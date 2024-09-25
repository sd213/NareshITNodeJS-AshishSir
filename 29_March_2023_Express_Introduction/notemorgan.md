# Morgan MiddleWare

**Morgan** is a middleware for Node.js that logs HTTP requests and responses in your application. It's commonly used in Express.js applications to keep track of HTTP traffic, helping developers monitor and debug their applications.

### **How Morgan Works**

Morgan intercepts incoming HTTP requests and logs details about them to the console or to a file. It can log various details, such as the request method, URL, status code, response time, and more.

### **Installing Morgan**

You can install Morgan using npm:

```bash
npm install morgan
```

### **Using Morgan in an Express Application**

Here's a basic example of how to use Morgan in an Express.js application:

```javascript
const express = require('express');
const morgan = require('morgan');

const app = express();

// Use morgan to log requests
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

### **Explanation:**

1. **Importing Morgan:**
   - `const morgan = require('morgan');` imports the Morgan middleware.
  
2. **Using Morgan as Middleware:**
   - `app.use(morgan('combined'));` integrates Morgan into your Express app. The `'combined'` argument specifies the format of the log output. Morgan has several predefined formats (e.g., `'tiny'`, `'combined'`, `'dev'`, etc.).

3. **Running the Server:**
   - When you start the server and make a request (e.g., visiting `http://localhost:3000/`), Morgan logs details about the request to the console.

### **Log Formats:**

Morgan supports several predefined log formats:

- **`'combined'`:** Standard Apache combined log output.
- **`'common'`:** Standard Apache common log output.
- **`'dev'`:** Concise output colored by response status for development use.
- **`'short'`:** Shorter than 'common', more concise.
- **`'tiny'`:** Extremely minimal output.

Example of a `'combined'` log entry:

```
::1 - - [19/Aug/2024:13:12:34 +0000] "GET / HTTP/1.1" 200 13 "-" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```

### **Customizing Morgan Logs:**

You can also create custom logging formats or use Morgan to log to a file instead of the console.

#### **Custom Log Format Example:**

```javascript
app.use(morgan(':method :url :status :response-time ms'));
```

This will log the HTTP method, URL, status code, and response time.

#### **Logging to a File:**

To log requests to a file instead of the console, you can use the `fs` module:

```javascript
const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

### **Summary:**

- **Morgan** is a logging middleware for Node.js that logs HTTP requests and responses.
- It helps monitor and debug applications by providing detailed logs.
- You can use predefined log formats or create custom ones, and you can log to the console or a file.
