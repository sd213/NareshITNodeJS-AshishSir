let express = require("express");
let dotenv = require("dotenv");
const app = express();
dotenv.config();
let morgan = require("morgan");
let fs = require("fs");
let catagoryRouter = require("./src/controller/CategoryRouter");
let productRouter = require("./src/controller/ProductRouter");
const port = process.env.port || 3400;

//middleware morgan
app.use(morgan("common", { stream: fs.createWriteStream("./app.log") }));

//static file path
app.use(express.static(__dirname+'/public'));
console.log(__dirname);

//html file path
app.set('views','./src/views'); // if this line commented then by default express will look for templates in default view directory  in home folder of project . if not present then it will give errors.

//view engine
app.set('view engine','ejs');


app.use("/catagory", catagoryRouter);
app.use("/products", productRouter);



app.get("/", (req, res) => {
//   res.send("Welcome to my Website");
    res.render("index.ejs",{title:'Home Page'});
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on http://localhost:${port}`);
});
