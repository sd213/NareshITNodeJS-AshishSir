let express = require('express');
let dotenv = require('dotenv');
const app = express();
dotenv.config();
let morgan = require('morgan');
let fs = require('fs');
let catagoryRouter = require("./src/controller/CategoryRouter");
let productRouter = require("./src/controller/ProductRouter");

// middleware
// app.use(morgan(":method :url :status :res[content-length] - :response-time ms")); //GET /products/ 304 - - 2.324 ms
// app.use(  morgan("combined", {     skip: function (req, res) {       return res.statusCode < 400;     },  }));
// app.use(morgan("common"))
// app.use(morgan("dev"))
// app.use(morgan("short"))
// app.use(morgan("tiny"))
app.use(morgan('common',{stream:fs.createWriteStream('./app.log')}))

app.use("/catagory",catagoryRouter)
// app.use(morgan('tiny')); 
app.use("/products",productRouter)

const port = process.env.port || 3400;

app.get("/",(req,res)=>{
    res.send("Welcome to my Website");
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
})