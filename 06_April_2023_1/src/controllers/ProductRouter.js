let express = require('express');
let productRouter = express.Router();
let mongodb = require("mongodb").MongoClient;
const url = process.env.MONGO_URL;
const client = new mongodb(url);
let product;
async function run(){
  try{
    await client.connect();
    const db = client.db("smith");
    const collection = db.collection("products");
    product  = await collection.find().toArray();
    console.log(product);
  }finally{
    await client.close();
  }
}
run().catch(console.error);
function routeR(menu){
  productRouter.get("/", (req, res) => {
    res.render("product.ejs", { title: "Products Page", data: product, menu });
  });

  productRouter.get("/details", (req, res) => {
    res.send("product details");
  });
  return productRouter
}

module.exports = routeR;