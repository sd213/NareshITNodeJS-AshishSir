# Refactored

If you're building the website without using Mongoose, you can still follow a modular approach but directly use the native MongoDB driver. Here's how you can structure your project and refactor your code accordingly:

### **1. Project Structure**

```plaintext
my-website/
├── config/
│   └── db.js
├── controllers/
│   ├── categoryController.js
│   ├── productController.js
│   └── ... (other controllers)
├── routes/
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   └── ... (other routes)
├── views/
│   ├── category.ejs
│   ├── product.ejs
│   └── ... (other views)
├── public/
│   ├── css/
│   ├── js/
│   └── ... (static files)
├── app.js
└── package.json
```

### **2. Refactoring the Code**

#### **2.1 Database Configuration (`config/db.js`)**

First, set up a database connection that can be reused across your application:

```javascript
const { MongoClient } = require('mongodb');

const url = 'your-mongodb-connection-string';
const dbName = 'your-database-name';

let db;

const connectDB = async () => {
    if (db) return db;
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(dbName);
    return db;
};

module.exports = connectDB;
```

#### **2.2 Controllers**

Controllers handle the logic for each part of your application. For example:

- **Product Controller (`controllers/productController.js`):**

  ```javascript
  const connectDB = require('../config/db');

  const getAllProducts = async (req, res) => {
      try {
          const db = await connectDB();
          const products = await db.collection('products').find().toArray();
          res.render('product', { products });
      } catch (err) {
          res.status(500).send('Error retrieving products');
      }
  };

  module.exports = { getAllProducts };
  ```

- **Category Controller (`controllers/categoryController.js`):**

  ```javascript
  const connectDB = require('../config/db');

  const getAllCategories = async (req, res) => {
      try {
          const db = await connectDB();
          const categories = await db.collection('categories').find().toArray();
          res.render('category', { categories });
      } catch (err) {
          res.status(500).send('Error retrieving categories');
      }
  };

  module.exports = { getAllCategories };
  ```

#### **2.3 Routes**

Routes map URLs to specific controller functions:

- **Product Routes (`routes/productRoutes.js`):**

  ```javascript
  const express = require('express');
  const router = express.Router();
  const { getAllProducts } = require('../controllers/productController');

  router.get('/products', getAllProducts);

  module.exports = router;
  ```

- **Category Routes (`routes/categoryRoutes.js`):**

  ```javascript
  const express = require('express');
  const router = express.Router();
  const { getAllCategories } = require('../controllers/categoryController');

  router.get('/categories', getAllCategories);

  module.exports = router;
  ```

#### **2.4 Setting Up the Application (`app.js`)**

In your main application file, you'll set up Express and include your routes:

```javascript
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

// Routes
app.use(productRoutes);
app.use(categoryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

### **3. Usage of Views**

In your `views` folder, you can create EJS templates for each page. For example:

- **Product Page (`views/product.ejs`):**

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <title>Products</title>
  </head>
  <body>
      <h1>Products</h1>
      <ul>
          <% products.forEach(product => { %>
              <li><%= product.name %> - $<%= product.price %></li>
          <% }) %>
      </ul>
  </body>
  </html>
  ```

- **Category Page (`views/category.ejs`):**

  ```html
  <!DOCTYPE html>
  <html>
  <head>
      <title>Categories</title>
  </head>
  <body>
      <h1>Categories</h1>
      <ul>
          <% categories.forEach(category => { %>
              <li><%= category.name %></li>
          <% }) %>
      </ul>
  </body>
  </html>
  ```

### **4. Benefits of This Structure**

- **Separation of Concerns:** Controllers handle logic, routes handle URLs, and views handle the presentation. This makes your codebase easier to manage and scale.
- **Reusability:** The `db.js` file allows you to reuse the database connection across multiple controllers without duplicating code.
- **Modularity:** Each part of your application (products, categories) is modular and can be developed and tested independently.

This refactoring allows your code to be more organized, scalable, and maintainable, especially as your application grows in complexity.
