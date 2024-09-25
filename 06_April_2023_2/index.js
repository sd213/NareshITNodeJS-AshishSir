const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const dotenv = require('dotenv');
const { MongoClient } = require("mongodb");
// const mongodb = require('mongodb').MongoClient;
dotenv.config();
const url = process.env.MONGO_URL;
console.log(url);
let categoryRouter;
let productRouter;
let menu = [];
const app = express();
const port = process.env.port || 3453;

async function connectToDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db("smith");

    menu = await db.collection("menu").find().toArray();
} catch (err) {
    console.error("Error connecting to the database:", err);
} finally {
    await client.close();
    categoryRouter = require("./src/controller/CategoryRouter")(menu);
    productRouter = require("./src/controller/ProductRouter")(menu);
    app.use("/category", categoryRouter);
    app.use("/product", productRouter);

}
}
connectToDatabase();

// let ProductRouter = require("./src/controller/ProductRouter")(menu);

app.use(morgan('combined',{stream:fs.createWriteStream("./app.logs")}));
app.use(express.static(__dirname+"/public"));
app.set("views",'./src/views');
app.set("view engine","ejs");

app.get("/",async (req,res)=>{
    res.render("index.ejs",{title:"Home Page",menu});
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})