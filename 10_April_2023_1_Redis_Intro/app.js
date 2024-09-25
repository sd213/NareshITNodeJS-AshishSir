const express = require("express");
const axios = require("axios");
const redis = require("redis");

// Set up the port
const port = process.env.PORT || 3545;

// Create an Express app
const app = express();

// Create a Redis client
const client = redis.createClient({
//   socket: {
    host: "172.28.150.223",
    port: 6369,
//   },
});

// Handle Redis connection errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Connect to Redis asynchronously
async function connectRedis() {
  await client.connect();
  console.log("Connected to Redis");
}

// Fetch data route
app.get("/data", async (req, res) => {
  try {
    let userInput = req.query.country ? req.query.country.trim() : "India";
    console.log(userInput);
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

    // Check if data is in Redis
    const cacheData = await client.get(userInput);

    if (cacheData) {
      // If data is found in Redis, return it
      const output = JSON.parse(cacheData);
      return res.send(output);
    } else {
      // If data is not in Redis, fetch from the API
      const response = await axios.get(url);
      const output = response.data;

      // Save the API response in Redis for future requests
      await client.setEx(
        userInput,
        10000,
        JSON.stringify({ source: "Redis Cache", output })
      );

      // Send the API response to the client
      return res.send({ source: "API Response", output });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// Start the server and connect to Redis
app.listen(port, async () => {
  try {
    await connectRedis(); // Ensure Redis is connected before starting the server
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.error("Failed to start server:", err);
  }
});
