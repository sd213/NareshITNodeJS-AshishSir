let http = require('http');
let fs = require('fs');

const server = http.createServer((req,res)=>{
    
    if(req.url=="/"&& req.method=="GET"){
        res.write("<h1>WELCOME TO SMALL APPLICATION</h1>");
        res.write("<a href='intro'>intro</a>");
        res.end(); 
    }else if(req.url=="/"&& req.method=="POST"){
        res.write("<h1>Just Demonstrating post</h1>");
        res.write("<a href='intro'>intro</a>");
        res.write("<form> </form>");
        res.end(); 
    }else if(req.url=="/intro" && req.method == "GET"){
        res.write("<h1>I am Node js Server running http module</h1>")
        res.write("<a href='/'>mainpage</a><br>");
        res.write("<a href='bye'>byepage</a>");
        res.end(); 
    }else if(req.url=="/bye" && req.method == "GET"){
        res.write("<h1>Thanks for visiting Website</h1>");
        res.end();
    }
    
})
server.listen(3000,'127.0.0.1',()=>{
    console.log(`Server running at `);
})