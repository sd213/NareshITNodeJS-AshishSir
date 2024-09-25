import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import axios from "axios";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import postsRouteR from "./src/controllers/postsController.js";
("./src/controllers/postsController.js");
import categoryRouteR from "./src/controllers/categoryController.js";
import contactRouteR from "./src/controllers/contactController.js";
import authorRouteR from "./src/controllers/authorsController.js";
let postsRouter,categoryRouter,contactRouter,authorRouter;
import redis from "redis";
// redis = require("redis");
const rclient = redis.createClient({
  //   socket: {
  host: "172.28.150.223",
  port: 6369,
  //   },
});
import { MongoClient } from "mongodb";
dotenv.config();
const url = process.env.url;
const dbName = process.env.dbName;
let trends;

// Handle Redis connection errors
rclient.on("error", (err) => {
  console.error("Redis error:", err);
});


const menu = [
  {
    name: "Home",
    navigation: "/",
  },
  {
    name: "Posts",
    navigation: "/posts",
  },
  {
    name: "Categories",
    navigation: "/category",
  },
  {
    name: "Authors",
    navigation: "/authors",
  },
  {
    name: "Contact",
    navigation: "/contact",
  },
];



async function connectToMongoDB() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const data = await db.collection("techcrunch").find()
      .sort({ date: -1 })
      .limit(3)
      .toArray();
    // console.log(trends);
    return data;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    client.close();
  }
}
// Connect to Redis asynchronously
async function connectToRedis(){
  await rclient.connect();
  let data;
  console.log("Connected to Redis");
  try {
    let cacheTrends = await rclient.get("trends");
    // console.log(cacheTrends);

    if (cacheTrends) {
      data = await JSON.parse(cacheTrends);
      console.log(data);
    } else {
      data = await connectToMongoDB();
      await rclient.setEx(
        "trends",
        500,
        JSON.stringify({ source: "Redis Trends Cache", data })
      );
      // closeConnection();
    }
    
  } catch {
    // throw error;
  }
  finally{
    trends = data;
    await rclient.quit();
    postsRouter = postsRouteR(menu, trends);
    categoryRouter = categoryRouteR(menu, trends);
    authorRouter = authorRouteR(menu, trends);
    contactRouter=contactRouteR(menu, trends);
    app.use("/posts", postsRouter);
    app.use("/category", categoryRouter);
    app.use("/authors/", authorRouter);
    app.use("/contact", contactRouter);
  }
}


console.log(fileURLToPath(import.meta.url));
console.log(dirname(fileURLToPath(import.meta.url)));

const port = process.env.port|| 3545;
const app = express();







app.use(express.static(dirname(fileURLToPath(import.meta.url))+"/public"));
app.set("views","./src/views");
app.set("view engine","ejs");
app.use(morgan("combined",{stream:fs.createWriteStream("./app.logs")}));



app.listen(port,async(err)=>{
  await connectToRedis();
   
  if(err) throw error;
    console.log(`Server is running on ${port}`);
  
})
app.get(["/", "/home"], async (req, res) => {
  console.log(trends);
  res.render("index", { title: "Home Page", menu, trends });
});

// const postsRouter = require("./src/controllers/postsController")();
// const categoryRouter = require("./src/controllers/categoryController")();
// const authorRouter = require("./src/controllers/authorsController")();
// const contactRouter = require("./src/controllers/contactController")();