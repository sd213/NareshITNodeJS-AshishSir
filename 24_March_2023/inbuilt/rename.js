let fs = require("fs");
fs.rename('myCode0.txt','myFile.xml',(err)=>{
    if(err) throw err;
    console.log("File Renamed")
});