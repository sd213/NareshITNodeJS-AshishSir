const express = require('express');
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
dotenv.config();
const url = process.env.MONGO_URL;
let category= []

let CategoryRouter = express.Router();

async function connectToDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db("smith");

    category = await db.collection("category").find().toArray();
  } catch (err) {
    console.error("Error connecting to the database:", err);
  } finally {
    await client.close();
    
  }
}
connectToDatabase();

function Router(menu){

    CategoryRouter.get("/",(req,res)=>{
        console.log(menu);
        res.render("category.ejs",{title:"Category",menu,category})
    })

    CategoryRouter.get("/details"),(req,res)=>{
        res.send("Category Details");
    }
    return CategoryRouter
}
module.exports = Router;