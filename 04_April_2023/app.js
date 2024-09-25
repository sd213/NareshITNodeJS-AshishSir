let express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fs = require('fs');
let app = express();
dotenv.config();
const port = process.env.port || 3354;
const menu = [

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
let catagoryRouter = require("./src/controllers/CategoryRouter")(menu);
let productRouter = require("./src/controllers/ProductRouter")(menu);


app.use(morgan("combined",{stream:fs.createWriteStream('./app.log')}));
app.use(express.static(__dirname+"/public"));
app.set("views","./src/views");
app.set("view engine","ejs");

console.log(app.get("views"));
console.log(app.get("view engine"));

app.use("/category", catagoryRouter);
app.use("/product", productRouter);
// app.use()

app.get("/",(req,res)=>{
    res.render("index.ejs",{title:"Home Page",menu});
})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on ${port}`);
    
})