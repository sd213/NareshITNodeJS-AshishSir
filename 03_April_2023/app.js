let express = require('express');
let dotenv = require('dotenv');
const morgan = require("morgan");
let app = express();
const fs = require("fs");
dotenv.config();
const port = process.env.port || 3454;
const menu = [
  // {
  //     name:"Home",
  //     link:"/"
  // },
  {
    name: "Category",
    link: "category",
  },
  {
    name: "Products",
    link: "product",
  },
  {
    name: "Tickets",
    link: "tickets",
  },
];


let catagoryRouter = require("./src/controller/CategoryRouter")(menu);
let productRouter = require("./src/controller/ProductRouter")(menu);

app.use(morgan("dev",{stream:fs.createWriteStream('./app.log')})); // logging middleware

app.use(express.static(__dirname + "/public")); // setting public files
app.set('views',"./src/views"); // seting views folder
app.set('view engine',"ejs"); // setting views engine



app.get("/",(req,res)=>{
    res.render("index.ejs",{title:"Home Page",menu});
})
app.use("/category", catagoryRouter);
app.use("/product", productRouter);
app.listen(port,(err)=>{
    console.log(`Server is running on ${port}`)
})