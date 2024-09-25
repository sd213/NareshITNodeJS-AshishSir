import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.url;
const dbName = process.env.dbName;
// Create a new router instance
let postRouter = express.Router();

let totalPages;
let totalItems;
let posts ;
async function connectToMongoDB(itemsPerPage, page) {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const collection = db.collection("techcrunch");

    if (!collection) {
      throw new Error("Collection not found");
    }
    // Calculate the number of items to skip and limit
    const skip = (page - 1) * itemsPerPage;
    posts = await collection
      .find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .toArray();
    totalItems = await collection.countDocuments(); // Total number of items in the collection
    totalPages = Math.ceil(totalItems / itemsPerPage); // Calculate total pages

    // posts = await collection.find({}).sort({ date: -1 }).toArray();
    // console.log(posts);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    client.close();
  }
}

// Define the route and export the router function
export default function postsRouteR(menu,trends) {
  // console.log(trends);
  // Define a GET route for the root path
  postRouter.get("/", (req, res) => {
     const itemsPerPage = 10; // Number of items per page
     const page = parseInt(req.query.page) || 1; 
    connectToMongoDB(itemsPerPage,page);
    res.render("posts.ejs", {
      title: "Posts",
      menu,
      posts,
      trends,
      currentPage: page,
      totalPages,
    });
  });

  // Return the configured router
  return postRouter;
}
