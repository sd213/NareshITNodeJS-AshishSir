import Redis from "redis";
import dotenv from "dotenv";
dotenv.config();
// Log the Redis URL to ensure it is set correctly
console.log('Connecting to Redis at:', process.env.redisServer);
const redisClient = Redis.createClient({
  url: process.env.redisServer, // Replace with your Redis server URL
});


redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});



export default redisClient;