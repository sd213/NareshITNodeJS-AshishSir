let express = require("express");
const app = express();
let dotenv = require("dotenv");
dotenv.config();
let port = process.env.port || 3210;

// let categoryRouter = express.Router();
let categoryRouter = require('./src/controller/CategoryRouter');
// let productRouter = express.Router();
let productRouter = require('./src/controller/ProductRouter');


app.get("/", (req, res) => {
  res.send(
    "<h1>index page</h1> <a href='category'>category</a> <br><br> <a href='products'>products</a>"
  );
});


app.use("/category", categoryRouter);
app.use("/products", productRouter);


app.listen(port, (err) => {
  if (err) throw err;
  else {
    console.log(`Server is running on ${port}`);
  }
});
