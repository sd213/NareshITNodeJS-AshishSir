import express from "express";
import request from "request";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import morgan from "morgan";
import fs from "fs";
// Convert the import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.port || 4500;

app.use(express.static(__dirname+"/public"))
app.use(morgan("dev",{stream:fs.createWriteStream("./app.logs")}))
app.set("views","./src/views");
app.set("view engine","ejs");

app.get('/weather',(req,res)=>{
    let city = req.query.city?req.query.city:'Bhubaneswar';
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    
    request(url,(err,response)=>{
        if(err) throw err;
        // res.send(response.body);
        const output = JSON.parse(response.body);
        res.render('index.ejs',{title:"Weather App",result:output});
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on ${port}`);
})