import express from "express";
import request from "request";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.port || 4500;

app.get('/weather',(req,res)=>{
    let city = req.query.city?req.query.city:'Bhubaneswar';
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    
    request(url,(err,response)=>{
        if(err) throw err;
        res.send(response.body);
    })
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server is running on ${port}`);
})