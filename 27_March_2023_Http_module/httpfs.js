let http = require("http");
let fs = require("fs");

let server = http.createServer((req, res)=>{
    console.log(req.headers.cookie);
    fs.readFile("city.json",'utf-8',(err,data)=>{
        if(err) throw err;
        else {res.write(data);
        res.end();}
    })
});
server.listen(7600);