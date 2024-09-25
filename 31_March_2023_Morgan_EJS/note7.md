#

In Node.js, specifically when using Express.js, `res.send()` and `res.render()` are both methods used to send a response to the client, but they serve different purposes and are used in different scenarios.

### `res.send()`

- **Purpose:** `res.send()` is a method used to send a response of various types (such as strings, JSON objects, buffers, etc.) to the client.
- **Usage:** It's commonly used when you need to send simple data back to the client without any server-side templating or HTML generation.
- **Content-Type:** Express automatically sets the `Content-Type` header based on the type of data you pass to `res.send()`. For example:
  - If you pass a string, it sets `Content-Type` to `text/html`.
  - If you pass an object or array, it sets `Content-Type` to `application/json`.
- **Example:**

  ```javascript
  const express = require('express');
  const app = express();

  app.get('/json', (req, res) => {
      res.send({ message: 'Hello, World!' });
  });

  app.get('/text', (req, res) => {
      res.send('Hello, World!');
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
  ```

### `res.render()`

- **Purpose:** `res.render()` is used to render a view template (like Pug, EJS, etc.) and send the rendered HTML to the client.
- **Usage:** It's used when you want to serve HTML pages that are dynamically generated based on template engines. It combines a view template with data to produce HTML output.
- **View Engine:** Before using `res.render()`, you must set up a view engine in your Express app.
- **Example:**

  ```javascript
  const express = require('express');
  const app = express();

  // Setting up the view engine
  app.set('view engine', 'pug');

  app.get('/home', (req, res) => {
      res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
  });

  app.listen(3000, () => console.log('Server running on port 3000'));
  ```

  - In this example, `res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' })` renders an `index.pug` file with the provided data, then sends the generated HTML to the client.

### Key Differences

- **`res.send()`** is for sending simple data (strings, JSON, etc.) directly to the client.
- **`res.render()`** is for rendering a template with data and sending the resulting HTML to the client.

### When to Use Each?

- Use `res.send()` when you want to send raw data like JSON, strings, or files.
- Use `res.render()` when you want to generate and serve HTML pages using a template engine.
