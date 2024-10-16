import { createClient } from "redis";
import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import { urlencoded, json } from "express";
const app = express();
const port = 4040;
const url = "mongodb://localhost:27017";
const mClient = new MongoClient(url);
const rClient = createClient({ host: "172.28.150.223", port: 6379 });
import { config } from "dotenv";
config();
let auth = process.env.AUTH_KEY;

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.listen(port, async (err) => {
  await mClient.connect();
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});

//get heartbeat
app.get("/", (req, res) => {
  res.sendStatus(200).send("Health OK");
});

// ## page 1
// List of city

app.get("/city", async (req, res) => {
  let key = req.query.key; //so key has to be passed in Query format
  if (key == auth) {
    await rClient.connect();
    //   let uInput = req.query.color.trim();

    let result = await rClient.get("city");
    if (result) {
      const output = JSON.parse(result);
      res.send(output);
    } else {
      const output = [];
      const cursor = mClient
        .db("nareshITzomato")
        .collection("location")
        .find({})
        .project({ location_name: 1, _id: 0 });
      for await (const data of cursor) {
        output.push(data);
      }
      await rClient.set(
        "city",
        JSON.stringify({ source: "Redis Cache", output })
      );
      cursor.closed;
      res.send({ source: "Mongo DB", output });
    }

    await rClient.disconnect();
  } else {
    res.status(401).send("Not Authenticated");
  }
});

// List of all restaurants
app.get("/restaurants", async (req, res) => {
  const apiKey = req.headers["x-api-key"]; // Get API key from headers .so key has to be passed in headers
  if (!apiKey) {
    return res.status(401).json({ error: "API key missing" });
  } else if (apiKey == auth) {
    await rClient.connect();
    let result = await rClient.get("restaurants");
    if (result) {
      const output = JSON.parse(result);
      res.send(output);
    } else {
      const output = [];
      const cursor = mClient
        .db("nareshITzomato")
        .collection("restaurants")
        .find({})
        .project({ restaurant_name: 1, _id: 0 });
      for await (const data of cursor) {
        output.push(data);
      }
      await rClient.set(
        "restaurants",
        JSON.stringify({ source: "Redis Cache", output })
      );
      cursor.closed;
      res.send({ source: "Mongo DB", output });
    }
    await rClient.disconnect();
  } else {
    return res.status(403).json({ error: "Invalid API key" });
  }
});

// * Restaurants w.r.t City
app.get("/restaurants/city/:city", async (req, res) => {
  // console.log(req.params.city);
  let city = req.params.city;
  let query = {};
  if (city != null) {
    query = { address: city };
  }
  await rClient.connect();
  let result = await rClient.get("restaurants in " + city);
  if (result) {
    const output = JSON.parse(result);
    res.send(output);
  } else {
    const output = [];
    const cursor = mClient
      .db("nareshITzomato")
      .collection("restaurants")
      .find(query);
    for await (const data of cursor) {
      output.push(data);
    }
    await rClient.set(
      "restaurants in " + city,
      JSON.stringify({ source: "Redis Cache", output })
    );
    cursor.closed;
    res.send({ source: "Mongo DB", output });
  }
  await rClient.disconnect();
});

// Restaurants w.r.t StateId

app.get("/restaurants/state", async (req, res) => {
  let stateId = req.query.stateId;
  let query = {};
  if (stateId != null) {
    stateId = Number(stateId);
    query = { state_id: stateId };
    await rClient.connect();
    let result = await rClient.get("restaurants in state" + stateId);
    if (result) {
      const output = JSON.parse(result);
      res.send(output);
    } else {
      const output = [];
      const cursor = mClient
        .db("nareshITzomato")
        .collection("restaurants")
        .find(query);
      for await (const data of cursor) {
        output.push(data);
      }
      await rClient.set(
        "restaurants in state" + stateId,
        JSON.stringify({ source: "Redis Cache", output })
      );
      cursor.closed;
      res.send({ source: "Mongo DB", output });
    }
    await rClient.disconnect();
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});
// * List of meals
app.get("/meals", async (req, res) => {
  await rClient.connect();
  let result = await rClient.get("meals");
  if (result) {
    const output = JSON.parse(result);
    res.send(output);
  } else {
    const output = [];
    const cursor = mClient.db("nareshITzomato").collection("mealType").find();
    for await (const data of cursor) {
      output.push(data);
    }
    await rClient.set(
      "meals",
      JSON.stringify({ source: "Redis Cache", output })
    );
    cursor.closed;
    res.send({ source: "Mongo DB", output });
  }
  await rClient.disconnect();
});

// ## page 2

// * Restaurant on the basis of Launch
// * Restaurants with respect to mealType + CuisineType
// * Restaurants with respect to mealType + cost
// * Sort on basis of price
// * Pagination

// ## page 3

// * Detail of the restaurant

// * Menu with respect to restaurant
