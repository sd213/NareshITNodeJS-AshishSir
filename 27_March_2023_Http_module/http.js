let http = require('http');

let server = http.createServer((req,res)=>{
    console.log(req.headers);
    res.write('<h1>This is Node JS Code Server</h1>');
    res.write('<h1>This is Node JS Code Server</h1>');
    res.end();
})

server.listen(7600)