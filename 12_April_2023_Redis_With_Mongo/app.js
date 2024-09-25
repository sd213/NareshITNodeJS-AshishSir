import { createClient } from "redis";
import express from "express";
import Mongo,{ MongoClient } from "mongodb";
const app = express();
const port = 4040;
const url = "mongodb://localhost:27017";
const mClient = new MongoClient(url);
const rClient = createClient({host:'172.28.150.223',port:6379});
console.log("hello");
rClient.on('err',err=>console.log(err));

async function main() {
    await mClient.connect()
}

const collection = mClient.db('smith').collection('products');
app.get('/data',async(req,res)=>{
    await rClient.connect();
    let uInput = req.query.color.trim();
    let result = await rClient.get(uInput);
    if(result){
        const output =  JSON.parse(result);
        res.send(output);
    }else{
        //as data is not in redis get from mongo 
        const output = [];
        // let query = {Color:"uInput"}
        const cursor = collection.find({Color:uInput});
        for await (const data of cursor){
            output.push(data)
        }
        await rClient.set(uInput,JSON.stringify({source:'Redis Cache',output}))
        cursor.closed;
        res.send({source:'Mongo DB',output});
    }

    await rClient.disconnect();
})

app.listen(port,(err)=>{
    main();
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
})