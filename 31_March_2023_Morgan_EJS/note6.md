# Render vs set method use

## To effectively explore the `render` and `set` methods in Express.js with EJS as the templating engine, we'll go through various scenarios and examples. These examples will demonstrate how to use the `render` method to generate dynamic HTML content and how to use the `set` method to configure various settings in your Express application "."

### **1. Basic Setup**

First, set up a basic Express application with EJS as the templating engine:

```javascript
const express = require('express');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Define the directory for view templates
app.set('views', './views');

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### **2. Basic Rendering**

Create a simple `index.ejs` file in the `views` directory:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <h1><%= message %></h1>
</body>
</html>
```

In your Express app, use the `render` method to render this view:

```javascript
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});
```

### **3. Rendering with Data**

You can pass different types of data to the EJS template. Here's an example of passing an array of objects:

```javascript
app.get('/users', (req, res) => {
    const users = [
        { name: 'John Doe', age: 30 },
        { name: 'Jane Doe', age: 25 },
        { name: 'Jim Beam', age: 40 }
    ];
    res.render('users', { title: 'User List', users: users });
});
```

In `views/users.ejs`, you can loop through the array and display the data:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <h1>User List</h1>
    <ul>
        <% users.forEach(user => { %>
            <li><%= user.name %> (Age: <%= user.age %>)</li>
        <% }) %>
    </ul>
</body>
</html>
```

### **4. Using Partials with `render`**

Partials are reusable components you can include in multiple templates. Create a partial called `header.ejs`:

```html
<!-- views/partials/header.ejs -->
<header>
    <h1><%= title %></h1>
</header>
```

You can include this partial in your main templates:

```html
<!-- views/index.ejs -->
<%- include('partials/header') %>
<p><%= message %></p>
```

Now, when you render the `index.ejs`, it will include the header partial:

```javascript
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});
```

### **5. Setting Application-Level Configurations with `set`**

You can use the `set` method to configure settings in Express. Here are a few examples:

- **Setting the Views Directory:**

  You can set the directory where your view templates are located:

  ```javascript
  app.set('views', './my-views-directory');
  ```

- **Setting a Custom Variable:**

  You can define custom variables that can be accessed throughout your app:

  ```javascript
  app.set('appName', 'My Awesome App');

  app.get('/about', (req, res) => {
      res.render('about', { title: 'About', appName: app.get('appName') });
  });
  ```

  In `views/about.ejs`:

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title><%= title %></title>
  </head>
  <body>
      <h1>About <%= appName %></h1>
  </body>
  </html>
  ```

- **Setting the `X-Powered-By` Header:**

  By default, Express sets an `X-Powered-By: Express` header. You can disable it for security reasons:

  ```javascript
  app.set('x-powered-by', false);
  ```

### **6. Rendering Conditional Content**

You can render different content based on conditions. For example, you might want to show a different message if a user is logged in:

```javascript
app.get('/dashboard', (req, res) => {
    const isAuthenticated = true; // Example condition
    res.render('dashboard', {
        title: 'Dashboard',
        isAuthenticated: isAuthenticated,
        username: isAuthenticated ? 'JohnDoe' : null
    });
});
```

In `views/dashboard.ejs`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <% if (isAuthenticated) { %>
        <h1>Welcome, <%= username %></h1>
    <% } else { %>
        <h1>Please log in to access your dashboard.</h1>
    <% } %>
</body>
</html>
```

### **7. Rendering Layouts**

Layouts allow you to create a consistent structure for your pages. A simple layout might include a header, footer, and a content section:

```html
<!-- views/layout.ejs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
</head>
<body>
    <%- include('partials/header') %>
    <main>
        <%- body %>
    </main>
    <%- include('partials/footer') %>
</body>
</html>
```

In your route handler, render the layout and pass the content as a string:

```javascript
app.get('/contact', (req, res) => {
    res.render('layout', {
        title: 'Contact Us',
        body: '<h2>Contact Information</h2><p>Email: contact@example.com</p>'
    });
});
```

### **Summary**

- **`render` Method:** Used to render templates and send them as responses to client requests. You can pass data to the template for dynamic content generation.
- **`set` Method:** Configures settings for your Express application, such as view engine, views directory, custom variables, and security settings.
- **Partials:** Reusable components that can be included in multiple templates.
- **Conditionals:** You can render different content based on conditions within your templates.
- **Layouts:** Helps maintain a consistent structure across different pages.

By exploring these methods and examples, you can create dynamic, maintainable, and efficient web applications using Express and EJS.
