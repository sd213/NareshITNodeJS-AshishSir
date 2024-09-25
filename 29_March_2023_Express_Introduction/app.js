let express = require('express');
let app = express(); // object of express;
let env = require('dotenv');

// env.config();
env.config({
//   path: `.env.dev`,
  path: `.env.stg`,
//   path: `.env.prod`,
});
let port = process.env.PORT ||6700;



//default route
app.get('/',(req,res)=>{
    res.send("Hi from express");
})

app.get('/test',(req,res)=>{
    res.send("Test Route");
})


// app.listen(port);  // code works
app.listen(port,(err)=>{
    if(err) throw err;
    else{
        console.log(`Server is running on ${port}`);
    }
})