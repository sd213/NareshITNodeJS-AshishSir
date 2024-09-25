let fs = require("fs");

fs.readFile("myCode1.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.readFile("myCode1.txt", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
