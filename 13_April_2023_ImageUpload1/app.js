const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const port = 3545;

// static file 
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');

//middleware
app.use(fileUpload())

app.get('/',(req,res)=>{
    res.render('index');
})

app.post('/profile',(req,res)=>{
    console.log(req.files);
    console.log(req.body);
    console.log(req.body.imgName);
    console.log(req.files.fileName.data);
    // res.send('ok');
    const imageFile = req.files.fileName;
    
    imageFile.mv(`${__dirname}/public/images/${imageFile.name}`,(err,data)=>{
        if(err) throw err;
        res.render('display',{title:req.body.imgName,imgName:imageFile.name
        });    
    });
    // res.render('display.ejs',{title:req.body.imgName,imgName:req.files.fileName.data})
})

app.get('/view',(req,res)=>{
    const images = require('public/images/')
    console.log(images);
    res.render('display',{title:"View All",images:req.files.public.image})
})
app.listen(port,()=>{
    console.log('listenning on port '+port);
})