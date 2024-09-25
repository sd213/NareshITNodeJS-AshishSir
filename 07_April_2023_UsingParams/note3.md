# Different way to connect MongodB and Fetching data"."

## Here are different ways to connect to MongoDB and fetch data using Node.js

### 1. **Using Callback Functions (Old Method)**

This is the traditional method using callbacks.

```javascript
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

MongoClient.connect(url, (err, client) => {
  if (err) throw err;
  console.log('Connected to MongoDB');
  const db = client.db(dbName);
  
  db.collection('users').find().toArray((err, users) => {
    if (err) throw err;
    console.log(users);
    client.close();
  });
});
```

### 2. **Using Promises**

Instead of callbacks, you can use Promises for better readability.

```javascript
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

MongoClient.connect(url)
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    return db.collection('users').find().toArray();
  })
  .then(users => {
    console.log(users);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
```

### 3. **Using `async/await` (Modern Method)**

This is the modern, most recommended method for handling asynchronous code.

```javascript
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

async function connectToMongoDB() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const users = await db.collection('users').find().toArray();
    console.log(users);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    client.close();
  }
}

connectToMongoDB();
```

### 4. **Using Mongoose (For MongoDB)**

If you're using Mongoose, which is an Object Data Modeling (ODM) library for MongoDB and Node.js, you can connect and fetch data as follows:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error', err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model('User', userSchema);

async function fetchData() {
  try {
    const users = await User.find();
    console.log(users);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

fetchData();
```

### 5. **Using Environment Variables for Connection**

This approach is similar to the others but uses environment variables to manage sensitive information like the connection URL.

```javascript
require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI; // Define MONGODB_URI in .env file
const dbName = 'mydatabase';

async function connectToMongoDB() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const users = await db.collection('users').find().toArray();
    console.log(users);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    client.close();
  }
}

connectToMongoDB();
```

### 6. **Using a Configuration File**

This method organizes the MongoDB connection code into a separate configuration file.

```javascript
// db.js
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

async function connectToMongoDB() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  return client.db(dbName);
}

module.exports = connectToMongoDB;

// app.js
const connectToMongoDB = require('./db');

async function fetchData() {
  try {
    const db = await connectToMongoDB();
    const users = await db.collection('users').find().toArray();
    console.log(users);
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

fetchData();
```

### Summary

- **Callback Functions**: Basic method, less readable.
- **Promises**: Improves readability and manages async operations.
- **async/await**: Modern and recommended approach.
- **Mongoose**: Provides additional features like validation, schema, etc.
- **Environment Variables**: Securely manage sensitive information.
- **Configuration File**: Separates concerns and organizes code better.

Each method has its use cases depending on your application's requirements and complexity.
