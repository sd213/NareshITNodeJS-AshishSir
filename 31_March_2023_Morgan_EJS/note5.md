# app.set()

## what is the use of set() in express

### In Express.js, the `app.set()` method is used to set various properties or configuration options for the Express application. These settings control how the application behaves in different environments, and they can be accessed throughout the app using `app.get()`"."

### Common Uses of `app.set()`

1. **Setting the View Engine:**
   - When you're using a template engine to render HTML views, you need to specify the view engine using `app.set()`.
   - Example:

     ```javascript
     const express = require('express');
     const app = express();

     // Set the view engine to Pug
     app.set('view engine', 'pug');

     app.get('/', (req, res) => {
         res.render('index', { title: 'Home Page', message: 'Welcome!' });
     });

     app.listen(3000, () => console.log('Server running on port 3000'));
     ```

   - This tells Express to use Pug as the template engine for rendering views.

2. **Setting the Views Directory:**
   - You can specify the directory where your view templates are located using `app.set('views', path)`.
   - Example:

     ```javascript
     const path = require('path');
     const express = require('express');
     const app = express();

     // Set the views directory
     app.set('views', path.join(__dirname, 'views'));

     app.set('view engine', 'ejs');

     app.get('/', (req, res) => {
         res.render('index', { title: 'Home Page', message: 'Welcome!' });
     });

     app.listen(3000, () => console.log('Server running on port 3000'));
     ```

   - In this example, Express will look for templates in the `views` directory relative to the current directory.

3. **Environment Mode:**
   - Express automatically sets the `env` setting based on the `NODE_ENV` environment variable, but you can override it using `app.set('env', 'production')`.
   - Example:

     ```javascript
     app.set('env', 'production');
     console.log(app.get('env')); // Outputs: production
     ```

   - This setting controls how your application behaves in different environments (development, production, etc.).

4. **Setting Application-Level Variables:**
   - You can use `app.set()` to store any kind of configuration value or variable that you want to access throughout your app.
   - Example:

     ```javascript
     app.set('appName', 'My Express App');
     console.log(app.get('appName')); // Outputs: My Express App
     ```

5. **Trust Proxy:**
   - The `trust proxy` setting lets you configure how Express should trust the `X-Forwarded-*` headers, which are commonly set by reverse proxies like Nginx.
   - Example:

     ```javascript
     app.set('trust proxy', true);
     ```

   - This is useful if your app is running behind a proxy, and you need to get the client's IP address or protocol.

6. **Case Sensitive Routing:**
   - By default, routing in Express is case-insensitive. You can change this behavior using `app.set('case sensitive routing', true)`.
   - Example:

     ```javascript
     app.set('case sensitive routing', true);

     app.get('/home', (req, res) => {
         res.send('Home Page');
     });

     // '/Home' and '/home' would be treated as different routes
     ```

7. **Strict Routing:**
   - The `strict routing` setting determines whether trailing slashes on URLs should be treated differently.
   - Example:

     ```javascript
     app.set('strict routing', true);

     app.get('/about/', (req, res) => {
         res.send('About Page with trailing slash');
     });

     // '/about' and '/about/' would be treated as different routes
     ```

### Summary1

- **`app.set()`** is used to configure various settings and properties in an Express application.
- Common uses include setting the view engine, configuring the views directory, controlling environment modes, and defining custom application-level variables.
- These settings influence how your Express app behaves and are often essential for setting up your application's environment and behavior.


## is it mandatory to set view engine and views path

No, it is not mandatory to set the view engine and views path in an Express.js application. However, doing so is typically necessary when you want to render dynamic HTML pages using a templating engine.

### **1. Setting the View Engine**

- **Purpose:** The `view engine` setting in Express.js tells the application which templating engine to use for rendering `.ejs`, `.pug`, or other types of template files.

- **Example:**

  ```javascript
  const express = require('express');
  const app = express();

  // Setting the view engine to EJS
  app.set('view engine', 'ejs');
  ```

- **Without Setting the View Engine:** If you don't set the view engine, you won't be able to use the `res.render()` method to render templates. Instead, you'd have to manually send HTML content using `res.send()`.

### **2. Setting the Views Path**

- **Purpose:** The `views` path is where Express looks for the template files. By default, Express looks for templates in a directory called `views` in the root of your project.

- **Example:**

  ```javascript
  // Set a custom views directory
  app.set('views', './my-templates');
  ```

- **Without Setting the Views Path:** If you don't set the views path, Express will look for templates in the default `views` directory. If your templates are located in a different directory, you'll need to set the `views` path, or Express will not be able to find them when rendering.

### **When You Don't Need to Set These**

1. **Serving Static Files:** If your application only serves static HTML files (i.e., no dynamic content), you don't need to set a view engine or views path. Instead, you'd use `express.static` to serve static files.

   ```javascript
   const express = require('express');
   const app = express();

   // Serve static files from the "public" directory
   app.use(express.static('public'));

   app.listen(3000, () => {
       console.log('Server is running on port 3000');
   });
   ```

2. **Using Another Rendering Method:** If you're rendering HTML using a different method or returning JSON responses (common in APIs), you don't need a view engine or views path.

   ```javascript
   app.get('/', (req, res) => {
       res.send('<h1>Hello World!</h1>'); // Directly sending HTML content
   });

   app.get('/api/data', (req, res) => {
       res.json({ message: 'Hello, JSON!' }); // Sending JSON response
   });
   ```

### **Summary**

- **Not Mandatory:** Setting the view engine and views path is not mandatory unless you're rendering dynamic HTML using templates.
- **Default Behavior:** If not set, Express defaults to the `views` directory for templates and requires explicit specification of the view engine to render templates.
- **Static Sites & APIs:** If your application is serving static content or working as an API (returning JSON), you don't need to set these configurations.

Setting these is mainly for convenience and clarity when working with templating engines.
