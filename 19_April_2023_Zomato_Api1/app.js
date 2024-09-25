let express = require('express');
let app = express();
let mongo = require("mongodb");
let MClient = mongo.MongoClient;
let dotenv = require('dotenv');
dotenv.config();
let mongourl = process.env.mongoUrl;
let bodyParser = require('body-parser');
let cors = require('cors');
let port = 1221;
let db;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

//get heartbeat
app.get('/',(req,res)=>{
    res.sendStatus(200).send('Health OK');
})

// ## page 1
// List of city 
app.get("/location",(req,res)=>{
    db.collection('location').find().toArray((err,data)=>{
        if(err) throw err;
        res.status(200).send(data);
    })
})

// List of all restaurants

// * Restaurants w.r.t City
// * List of meals



MClient.connect(mongourl,{useNewUrlParser:true},(err,client)=>{
    if(err) console.log(`Error While connecting to mongo`);
    db = client.db("nareshITzomato");
 
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
})
   