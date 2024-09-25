const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();
const url = process.env.MONGO_URL;
let product = [];

let ProductRouter = express.Router();

async function connectToDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db("smith");

    product = await db.collection("products").find().toArray();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    await client.close();
  }
}
connectToDatabase();

function Router(menu) {
  ProductRouter.get("/", (req, res) => {
    console.log(menu);
    res.render("product.ejs", { title: "Product", menu, product });
  });

  ProductRouter.get("/details"),
    (req, res) => {
      res.send("Product Details");
    };
  return ProductRouter;
}
module.exports = Router;
