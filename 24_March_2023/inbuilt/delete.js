let fs = require("fs");
fs.unlink('myCode1.txt',(err)=>{
    if(err) throw err;
    console.log("Sucessfully Deleted");
})
