let fs= require('fs');
fs.writeFile("mycode1.txt",'This is mydata of node',()=>{});
fs.writeFile("mycode2.txt",'This is mydata of node',(err)=>{
    if(err) throw err;
    console.log("Second Task Done");
})

fs.writeFile("mycode3.txt", "This is Outer Loop", (err) => {
  if (err) throw err;
  else{
  console.log("OuterLoop Executed")
  fs.writeFile("mycode4.txt", "This is Inner Loop", (err) => {
    if (err) throw err;
    console.log("InnerLoop Executed");
  });
}
});