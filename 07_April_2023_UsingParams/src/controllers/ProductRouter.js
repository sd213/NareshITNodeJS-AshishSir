let express = require("express");
let productRouter = express.Router();
let mongodb = require("mongodb").MongoClient;
const url = process.env.MONGO_URL;
const client = new mongodb(url);
let data1,data2;
let product;
let specificproduct;
let productbyid;
async function run() {
  try {
    await client.connect();
    const db = client.db("smith");
    const collection = db.collection("products");
    product = await collection.find().toArray();
  } finally {
    await client.close();
  }
}
 run().catch(console.error); 



function routeR(menu) {
  productRouter.get("/", (req, res) => {
    res.render("product.ejs", { title: "Products Page", data1: product, data2,menu });
  });

  productRouter.route("/category/:id").get(async function (req, res) {
    let id = req.params.id;
    async function run(id) {
      let data=[];
      try {
        await client.connect();
        const db = client.db("smith");
        const collection = db.collection("products");
        data = await collection.find({ category_id: Number(id) }).toArray();
      } catch{
        throw error;
      }finally {
        await client.close();
      }
      return data;
    }
   
    specificproduct = await run(id).catch(console.error);
    res.render("product.ejs",{title: "Products Page",data1:specificproduct,menu});
  });

  productRouter.route("/details/:id").get(async(req, res) => {
    let id = req.params.id;
    async function productidfetch(id) {
      let data = [];
      try {
        await client.connect();
        const db = client.db("smith");
        const collection = db.collection("products");
        data = await collection.find({ id: Number(id) }).toArray();
        console.log(data);
      } catch {
        throw error;
      } finally {
        await client.close();
      }

      return data;
    }
    productbyid = await productidfetch(id).catch(console.error);
    console.log(productbyid);
    console.log(productbyid[0]);
    res.render("product.ejs",{title:"Product Page",data1 ,data2:productbyid[0],menu});
  });


  productRouter.get("/details", (req, res) => {
    res.send("product details");
  });
  return productRouter;
}

module.exports = routeR;
