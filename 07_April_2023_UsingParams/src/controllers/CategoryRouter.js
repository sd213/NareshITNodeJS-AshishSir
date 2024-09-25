let express = require("express");
const { MongoClient } = require("mongodb");

let categoryRouter = express.Router();
let mongodb = require("mongodb").MongoClient;
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
let category;
async function run() {
  try {
    await client.connect();
    const db = client.db("smith");
    const collection = db.collection("category");
    category = await collection.find().toArray();
  } finally {
    await client.close();
  }
}
run().catch(console.error);
function router(menu) {
  categoryRouter.route("/").get((req, res) => {
      res.render("category",{title:"Category Page",category,menu})
  });

  categoryRouter.route("/details").get((req, res) => {
    res.send("Category Details");
  });

  return categoryRouter;
}

module.exports = router;
